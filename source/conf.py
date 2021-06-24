import os
import sys
project = u' '
copyright = u'2016-2021 by equadratures.org'
author = u'equadratures'
# -- Bryn: Main Vuepress website location ------------------------------------
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
]
templates_path = ['_templates']
source_suffix = '.txt'
master_doc = 'index'
html_title = 'equadratures'
html_theme = 'pydata_sphinx_theme'
html_logo = 'logo_new.png'
html_favicon = 'eq-logo-favicon.png'
language = None
exclude_patterns = [u'_docsbuild', 'Thumbs.db', '.DS_Store']
html_static_path = ['_static']
html_css_files = [
        'css/styles.css',
        'css/footer.css',
        'css/cards.css'
        ]
panels_add_bootstrap_css = False # sphinx-panels shouldn't add bootstrap css since the pydata-sphinx-theme already loads it
htmlhelp_basename = 'EffectiveQuadraturesdoc'
latex_elements = {
    'papersize': 'a4paper',
    'pointsize': '12pt',
}
man_pages = [
    (master_doc, 'effectivequadratures', u'Effective Quadratures Documentation',
     [author], 1)
]
texinfo_documents = [
    (master_doc, 'equadratures', u' ',
     author, 'equadratures', 'equadratures is an open-source python code developed by Effective Quadratures. It is tailored for tackling problems in uncertainty quantification, surrogate-based optimisation, numerical integration, and data-driven dimension reduction. ',
     'Miscellaneous'),
]
intersphinx_mapping = {
        'https://docs.python.org/': None,
        'numpy': ('https://numpy.org/doc/stable/', None),
        'matplotlib': ('https://matplotlib.org/stable/', None),
        'scipy': ('https://docs.scipy.org/doc/scipy/reference/',None),
        'sklearn': ('http://scikit-learn.org/stable',
            (None, './_intersphinx/sklearn-objects.inv'))
        }
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
