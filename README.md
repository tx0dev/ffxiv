# FFXIV Reference site

The entire reason this exist is because I want to have access to some quick reference material on my tablet and not alt-tab out of the game.

It's available at https://ffxiv.tx0.dev, hosted on [pico.sh](https://pico.sh/).

## Development

Install [Hugo](https://gohugo.io/).
We're using the very simple [Hugo-Book](https://github.com/alex-shpak/hugo-book) theme.

```sh
hugo serve --disableFastRender
```

For testing on tablet, pass the `--bind 0.0.0.0`, and check the firewall for port 1313.

## Deploy

To take advantage of the pico.sh [image optimization](https://pico.sh/images#image-manipulation), we have to pass the `--environment pico`.

```sh
hugo --environment pico
rsync -rv public/ pgs.sh:/ffxiv
```
## Features

### Shortcodes

#### Currency

draw a simple box with the current icon. Take 2 arguments, the amount and the currency name. current default to `gil` if not provided. check the [shortcodes file](layouts/shortcodes/currency.html) for the full list of currency.

```markdown
{{< currency 000 "poetics" >}}
```

#### Quests

Same as the currency shortcode, but for quest icons.

```markdown
{{< quest "Ifrit Bleeds, We Can Kill It" "msq" >}}
```

#### Bundle Gallery

A gallery [shortcode](layouts/shortcodes/bundle-gallery.html) that look for page bundle file and render them.

```markdown
{{< bundle-gallery >}}
```

## Roadmap

- [ ] Add current extreme and savage guide
- [ ] SBOM for SQEX assets
- [ ] Maybe "standardize" link references
- [ ] Get the [FFXIV Tooltip](https://eu.finalfantasyxiv.com/lodestone/special/fankit/tooltip/) working

## Copyright

Some images, contents, and assets © SQUARE ENIX CO., LTD. All rights reserved.

FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd.
