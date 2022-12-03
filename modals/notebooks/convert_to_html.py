from distutils.command.config import config
from traitlets.config import Config
import nbformat as nbf
from nbconvert.exporters import HTMLExporter
from nbconvert.preprocessors import TagRemovePreprocessor, ExecutePreprocessor
from bs4 import BeautifulSoup as bs
import os, sys
import minify_html

args = sys.argv
# Get input filename from system argument
filename = [os.path.basename(os.path.splitext(inp)[0]) for inp in args if os.path.splitext(inp)[1] == ".ipynb"][0]
ipynb_file = filename + ".ipynb"

# Check if output HTML should be minified (Default: False)
bool_minify = False
if "minify" in args:
    bool_minify = True

# Setup config
c = Config()
c.TagRemovePreprocessor.remove_cell_tags = ("remove_cell",)
c.TagRemovePreprocessor.enabled = True
c.TemplateExporter.exclude_input_prompt = True
c.TemplateExporter.exclude_output_prompt = True

# c.TemplateExporter.template_paths = "templates"
c.TemplateExporter.extra_template_basedirs = ["templates"]
c.TemplateExporter.template_name = "lab_custom"

# Configure and run out exporter
c.HTMLExporter.preprocessors = ["nbconvert.preprocessors.TagRemovePreprocessor"]
exporter = HTMLExporter(config=c)
exporter.register_preprocessor(TagRemovePreprocessor(config=c), True)

# Load iPython notebook
with open(ipynb_file) as f:
    nb = nbf.read(f, as_version=4)

# Define plotly theme
theme = "light"
ptheme = "white"

# Add header for plotly
code_cell = nbf.v4.new_code_cell(
    source=f"import plotly.io as pio\npio.renderers['iframe_connected'].html_directory='{filename}'\npio.renderers.default = 'iframe_connected'\npio.templates.default = 'plotly_{ptheme}'",
    metadata={"tags": ["remove_cell"]},
)
nb.cells.insert(0, code_cell)

# Run notebook
ep = ExecutePreprocessor(kernel_name="python3")
ep.preprocess(nb, {"metadata": {"path": "."}})

# Define HTML export theme
HTMLExporter(config=c).theme = theme

# Get output html and metadata
output = HTMLExporter(config=c).from_notebook_node(nb)
split_out = output[0].splitlines()

if bool_minify == True:
    html_output = minify_html.minify(
        "\n".join(split_out),
        keep_spaces_between_attributes=False,
        keep_comments=False,
        minify_css=True,
        minify_js=True,
        remove_bangs=True,
        remove_processing_instructions=True,
    )
else:
    html_output = "\n".join(split_out)

soup = bs(html_output, "html.parser")
for script in soup.find_all("script"):
    # Remove requirejs definition for plotly js
    if "requirejs" in script.text:
        print(script)
        script.extract()

# Write to output html file
with open(filename + ".html", "w", encoding="utf-8") as f:
    f.write(str(soup))
