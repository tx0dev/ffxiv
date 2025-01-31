# FFXIV Reference site

A simple site available at https://ffxiv.tx0.dev. Hosted [pico.sh](https://pico.sh/) platform.

The entire reason this exist is because I want to have access to some quick reference material on my tablet and not alt-tab out of the game.

## Development

Install [Hugo](https://gohugo.io/).

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

## Roadmap

- [ ] Add current extreme and savage guide
- [ ] SBOM for SQEX assets
- [ ] Get the [FFXIV Tooltip](https://eu.finalfantasyxiv.com/lodestone/special/fankit/tooltip/) working

## Copyright

Some images, contents, and assets © SQUARE ENIX CO., LTD. All rights reserved.

FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd.
