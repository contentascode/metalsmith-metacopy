
# metalsmith-metacopy

  A metalsmith plugin to manipulate metadata and file metadata.

## Installation

    $ npm install metalsmith-metacopy

## CLI Usage

  Install via npm and then add the `metalsmith-metacopy` key to your `metalsmith.json` plugins, like so:

```json
{
  "plugins": {
    "metalsmith-metacopy": {
      "file": [ 
        { "src": "contents", "dest": "content" }
      ],
      "metadata": [
        { "src": "collections", "dest": "site" }
      ]
    }
  }
}
```

This will make the `content` key for files available also at the `content` key and copy the `collections` key (for instance created by the `metalsmith-collection`) into the `site` key in the global metadata object (both useful in the context of porting a jekyll site with liquid templates)

## License

  MIT
