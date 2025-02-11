---
title: Site Features
bookToC: true
bookFlatSection: true
bookCollapseSection: true
weight: 99
---

# Site Features

## Shortcodes

### Currencies
```tpl
{{</* tomestone <text> <type> */>}}
```

{{% columns %}}
> It will cost {{<tomestone 100 "poetics" >}}.
<--->
```tpl
It will cost {{</* tomestone 100 "poetics" */>}}.
```
{{% /columns %}}
#### Option

Not all currency are present, since not all of them are used, so here's the list:

* `gil` Gil
* `poetics` Allagan Tomestones of Poetics
* `aesthetics` Allagan Tomestones of Aesthetics
* `heliometry` Allagan Tomestones of Heliometry
* `nuts` Sacks of Nuts
* `centurio` Centurio Seal
* `allied` Allied Seal
* `bicolor` Bicolor Gemstone

### Game References

```tpl
{{</* xiv [quest=""|duty=""] [db=""|href=""] text="" / */>}}
{{</* xiv [quest=""|duty=""] [db=""|href=""] */>}}Dawntrail{{</* /xiv */>}}
```

{{%columns %}}
> Complete the {{< xiv text="Trial of the Braves" quest=feature />}}. \
> Last MSQ {{< xiv quest=msq db="quest=7a0da925036" >}}Dawntrail{{</xiv>}}. \
> {{< xiv duty=chaotic >}}The Cloud of Darkness (Chaotic) {{< /xiv >}} was added in 7.15.
<--->
```tpl
Complete the {{</* xiv text="Trial of the Braves" quest=feature / */>}}. \
Last MSQ {{</* xiv quest=msq db="quest=7a0da925036" */>}}Dawntrail{{</* /xiv */>}}. \
{{</* xiv duty=chaotic */>}}The Cloud of Darkness (Chaotic) {{</* /xiv */>}} was added in 7.15.
```
{{% /columns %}}

#### Options

The `xiv` shortcode encompasses most of the game references. It supports inline or wrapping, and automatic linking to the Eaorzea Database, including Tooltip.

You can specific `quest` or `duty` to show the appropriate icon.

`quest` options are: `normal`, `repeat`, `feature`, `featurerepeat`, `msq`, `seasonal`. \
`duty` options are: `dungeon`, `guildhest`, `chaotic`, `pvp`, `raid`, `trial`, `ultimate`, `variant`, `deep`, `field`.

#### Database Linking

The `db` option must specific the type and the id in the format `type=id`. On the Eorzea DB, the display tooltip code show the two value:

```text
[db:duty=944ebdbd874]The Jade Stoa (Unreal)[/db:duty]
```
In this case, the value of `db` would be `duty=944ebdbd874`:
{{%columns ratio=1:2 %}}
> {{< xiv db="duty=944ebdbd874" >}}The Jade Stoa (Unreal){{< /xiv >}} \
> {{< xiv duty=trial db="duty=944ebdbd874" >}}The Jade Stoa (Unreal){{< /xiv >}}
<--->
```tpl
{{</* xiv db="duty=944ebdbd874" */>}}The Jade Stoa (Unreal){{</* /xiv */>}}
{{</* xiv duty=trial db="duty=944ebdbd874" */>}}The Jade Stoa (Unreal){{</* /xiv */>}}
```
{{% /columns %}}

You can also have arbitrary link with the `href` option.

### Bundle gallery

  ```text
  {{</* bundle-gallery prefix="skyfire_1" */>}}
  ```

Will render a gallery of image with lightbox from within the page bundle. See [Trial of the Braves](/relic-weapons/arr/trial-of-the-braves/) for example.

Use the `filter-images` partials to filter the images.

#### Options
* `pattern` Glob pattern | default `*`
* `type` File extension | default `all` = `jpg,jpeg,png,gif,webp`
* `prefix` File prefix | default `<blank>`
* `suffix` File suffix | default `<blank>`
