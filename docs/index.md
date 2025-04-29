# Template Documentation

> A clean, modern documentation template with dynamic navigation.

## Overview

This template provides a foundation for creating consistent documentation sites across multiple projects. It features a dynamic navigation system that automatically generates the navigation menu from your `mkdocs.yml` configuration.

## Key Features

- **Dynamic Navigation** — Navigation automatically generated from your mkdocs.yml
- **Consistent Styling** — Shared look and feel across all documentation sites
- **Feedback System** — Built-in feedback button for collecting user input
- **Modern Design** — Clean, responsive layout with light/dark mode support

## Getting Started

To use this template for a new documentation site:

1. Copy the entire template directory
2. Modify the `site_name` and `nav` sections in `mkdocs.yml`
3. Replace the content in the `docs` directory with your own documentation
4. Run `mkdocs serve` to preview your site

```bash
# Example of creating a new documentation site from this template
cp -r /Users/jwunderm/code/template /Users/jwunderm/code/new-project
cd /Users/jwunderm/code/new-project
# Edit mkdocs.yml and docs content
mkdocs serve
```

## Template Structure

The template is organized to make customization straightforward:

- **mkdocs.yml** — Main configuration file (only modify site_name and nav sections)
- **docs/** — Documentation content (replace with your own)
- **docs/assets/** — Images and other assets
- **docs/stylesheets/** — CSS styling (shared across all sites)
- **docs/javascripts/** — JavaScript functionality (shared across all sites)
- **docs/overrides/** — Template overrides for MkDocs Material theme

!!! tip "Customization Tip"
    For most projects, you only need to modify the `nav` section in `mkdocs.yml` and add your own content files. The dynamic navigation system will handle the rest!
