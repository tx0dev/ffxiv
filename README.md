# FFXIV Reference site

The entire reason this exist is because I want to have access to some quick reference material on my tablet and not alt-tab out of the game.

It's available at https://ffxiv.tx0.dev, hosted on [pico.sh](https://pico.sh/).

## Development

Install [Hugo](https://gohugo.io/).
We're using the very simple [Hugo-Book](https://github.com/alex-shpak/hugo-book) theme.
Most of the FFXIV functionality are in a seperate [Hugo module](https://github.com/tx0dev/hugo-xiv) for people to use on their own sites.

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

_Note: The implementation of this could be better as it's just a variable check in the templates. Dunno where it would be in the Hugo render/pip hooks._

## Roadmap

Moved the site functionality to the [Hugo XIV module](http://github.com/tx0dev/hugo-xiv).

- [ ] SBOM for SQEX assets
- [ ] Current extreme and savage guide
- [ ] Complete the ARR relic weapon (going through it right now)
- [ ] Basic game info, mostly mechanics
- [ ] DoL/DoH reference and powerleveling (Did CUL, just need to do the other)

## Copyright


FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd. \
Some images, contents, and assets © SQUARE ENIX - Used under the [Material Usage License](https://support.na.square-enix.com/rule.php?id=5382&tag=authc).
