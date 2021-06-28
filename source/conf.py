import os
import sys

# Misc Sphinx settings
#########################
project = u' '
copyright = u'2016-2021 by equadratures.org'
author = u'equadratures'
land_page = "equadratures.org"
outdir = sys.argv[-1]   #Bryn: Assuming last system argument is output directory
version = u'9.1'
release = u'v9.1.0'
extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.doctest',
    'sphinx.ext.intersphinx',
    'sphinx.ext.todo',
    'sphinx.ext.coverage',
    'sphinx.ext.mathjax',
    'sphinx.ext.ifconfig',
    'sphinx.ext.viewcode',
    'sphinx.ext.githubpages',
    'sphinxcontrib.napoleon',
    'sphinx_panels',
    'sphinx_copybutton',
    'nbsphinx',
    'sphinx_gallery.load_style',
] #TODO - prune unused extensions
master_doc = 'index'
html_title = 'equadratures'
html_theme = 'pydata_sphinx_theme'
html_logo = 'logo_new.png'
html_favicon = 'eq-logo-favicon.png'
language = None
exclude_patterns = [u'_docsbuild', 'Thumbs.db', '.DS_Store']
source_suffix = '.txt'
htmlhelp_basename = 'EffectiveQuadraturesdoc'
latex_elements = {
    'papersize': 'a4paper',
    'pointsize': '12pt',
}

# Manual and text info outputs
#########################
man_pages = [
    (master_doc, 'effectivequadratures', u'Effective Quadratures Documentation',
     [author], 1)
]
texinfo_documents = [
    (master_doc, 'equadratures', u' ',
     author, 'equadratures', 'equadratures is an open-source python code developed by Effective Quadratures. It is tailored for tackling problems in uncertainty quantification, surrogate-based optimisation, numerical integration, and data-driven dimension reduction. ',
     'Miscellaneous'),
]

# Templates, static files, and css (bug with css being copied to _static/css, this must be done manually for now)  
#########################
templates_path = ['_templates']
html_static_path = ['_static']
html_css_files = [
        'css/styles.css',
        'css/footer.css',
        'css/cards.css',
        'css/gallery.css',
        'css/fonts.css'
]

# Sphinx panels
#########################
panels_add_bootstrap_css = False # sphinx-panels shouldn't add bootstrap css since the pydata-sphinx-theme already loads it

# copybutton settings
#########################
copybutton_prompt_text = r">>> |\.\.\. |\$ |In \[\d*\]: | {2,5}\.\.\.: | {5,8}: "
copybutton_prompt_is_regexp = True
copybutton_line_continuation_character = "\\"

# nbsphinx setting
#########################
nbsphinx_execute_arguments = [
    "--InlineBackend.figure_formats={'svg', 'pdf'}",
    "--InlineBackend.rc=figure.dpi=96",
]
nbsphinx_input_prompt = 'In [%s]:'
nbsphinx_output_prompt = 'Out[%s]:'
# This is processed by Jinja2 and inserted before each notebook
nbsphinx_epilog = r""" 
{% set docname = env.doc2path(env.docname, base=None) | replace('_documentation/', '') %}

.. raw:: html

    <div class="admonition tutorial">
      This page was generated from
      <a class="reference external" href="https://github.com/equadratures/equadratures.github.io/blob/master/_documentation/{{ docname|e }}">{{ docname|e }}</a>.
      <br>
      Interactive online version:
      <span style="white-space: nowrap;"><a href="https://colab.research.google.com/github/equadratures/equadratures.github.io/blob/master/_documentation/{{ docname|e }}"><img alt="Colab badge" src="https://colab.research.google.com/assets/colab-badge.svg" style="vertical-align:text-bottom"></a></span>
    </div>

.. raw:: latex

    \nbsphinxstopnotebook{\scriptsize\noindent\strut
    \textcolor{gray}{The following section was generated from
    \sphinxcode{\sphinxupquote{\strut {{ docname | escape_latex }}}} \dotfill}}
"""

nbsphinx_thumbnails = {
    '_documentation/tutorials/3_Model_Fitting':'_static/eq-logo-favicon.png',
    '_documentation/tutorials/Dimension_Reduction_Turbomachinery':'_documentation/tutorials/images/probe.jpeg',
    '_documentation/tutorials/Computing_Moments_for_CFD':'_documentation/tutorials/images/vki_turbine.jpeg',
    '_documentation/tutorials/Machine_Learning_Airfoil':'_documentation/tutorials/images/airfoil_noise.png',
}

# Intersphinx mapping
intersphinx_mapping = {
        'https://docs.python.org/': None,
        'numpy': ('https://numpy.org/doc/stable/', None),
        'matplotlib': ('https://matplotlib.org/stable/', None),
        'scipy': ('https://docs.scipy.org/doc/scipy/reference/',None),
        'sklearn': ('http://scikit-learn.org/stable',
            (None, './_intersphinx/sklearn-objects.inv'))
        }

# pydata theme options
#########################
html_theme_options = {
    "external_links": [{"url": "https://discourse.equadratures.org/", "name": "Discourse"}],
#    "github_url": "https://github.com/Effective-Quadratures/equadratures",
#    "twitter_url": "https://twitter.com/equadratures",
    "navbar_align": "right",
    "show_prev_next": False,
    "search_bar_text": "Search equadratures...",
    "footer_items": ["footer"],
}
html_sidebars = {
  "index": [],
  "_documentation/apps": [],
  "_documentation/developers": []
}
