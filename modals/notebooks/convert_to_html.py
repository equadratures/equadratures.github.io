from distutils.command.config import config
from traitlets.config import Config
import nbformat as nbf
from nbconvert.exporters import HTMLExporter
from nbconvert.preprocessors import TagRemovePreprocessor, ExecutePreprocessor
from bs4 import BeautifulSoup as bs
import sys
import minify_html

themes = ["light", "dark"]

args = sys.argv
# Get input filename from system argument
ipynb_file = args[1]

# Check if output HTML should be minified (Default: True)
bool_minify = True
if len(args) == 3:
    if args[2] == "False":
        bool_minify = False

filename = ipynb_file.split(".")[0]

# Setup config
c = Config()
c.TagRemovePreprocessor.remove_cell_tags = ("remove_cell",)
c.TagRemovePreprocessor.enabled = True
c.TemplateExporter.exclude_input_prompt = True

# Configure and run out exporter
c.HTMLExporter.preprocessors = ["nbconvert.preprocessors.TagRemovePreprocessor"]
exporter = HTMLExporter(config=c)
exporter.register_preprocessor(TagRemovePreprocessor(config=c), True)

for theme in themes:
    with open(ipynb_file) as f:
        nb = nbf.read(f, as_version=4)

    # Define plotly theme
    ptheme = "white" if theme == "light" else theme

    # Add header for plotly
    code_cell = nbf.v4.new_code_cell(
        source=f"import plotly.io as pio\npio.renderers.default='notebook_connected'\npio.templates.default = 'plotly_{ptheme}' ",
        metadata={"tags": ["remove_cell"]},
    )
    nb.cells.insert(0, code_cell)

    # Run notebook
    ep = ExecutePreprocessor()
    ep.preprocess(nb, {"metadata": {"path": "."}})

    # Define HTML export theme
    exporter.theme = theme

    # Get output html and metadata
    output = exporter.from_notebook_node(nb)
    split_out = output[0].splitlines()

    # for i, line in enumerate(split_out):
    #     if "/plotly-" in line:
    #         ## Replace plotly js link
    #         # split_out[i] = split_out[i].replace("/plotly-", "/plotly-basic-")
    #         # split_out[i] = "'plotly': ['/scripts/vendor/plotly-gl3d-2.12.1.min']"
    #         ## Remove plotly js link
    #         split_out.pop(i)

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
        # Remove require js import
        elif ("src" in script.attrs) and ("require.min.js" in script.get("src")):
            print(script)
            script.extract()
        # plyrequire = """require(["plotly"]"""
        # if plyrequire in script.text:
        #     # print(script)
        #     script.string = script.text.replace(
        #         """require(["plotly"]""", "require([" "]"
        #     )

    # Write to output html file
    with open(filename + f"_{theme}.html", "w", encoding="utf-8") as f:
        f.write(str(soup))
