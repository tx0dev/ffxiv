---
title: Site Features
bookToC: true
bookFlatSection: true
bookCollapseSection: true
---

# Site Features

## Shortcodes

### Currencies
```tpl
It will cost {{</* currency 100 "poetics" */>}}.
```

> It will cost {{<currency 100 "poetics" >}}.

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

### Quests

```tpl
Complete the {{</* quest "Trial of the Braves" "feature" */>}}.
```

> Complete the {{< quest "Trial of the Braves" "feature" >}}.

#### Otions

* `normal` Quest
* `feature` Feature quest
* `msq` Main Story quest
* `leve` Levequest
* `other` Other quest
* `featurerepeat` Repeatable feature quest
* `normalrepeat` Repeatable quest


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
