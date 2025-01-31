---
title: Theme features
bookToC: true
bookSearchExclude: true
---

# Theme features

For quick reference, directly lifted from the [Hugo Book](https://github.com/alex-shpak/hugo-book?tab=readme-ov-file#shortcodes) docs.

## Columns

Columns help organize shorter pieces of content horizontally for readability.


```tpl
{{%/* columns [ratio="1:1"] [class="..."] */%}} <!-- begin columns block -->
# Left Content
Lorem markdownum insigne...

<---> <!-- magic separator, between columns -->

# Mid Content
Lorem markdownum insigne...

<---> <!-- magic separator, between columns -->

# Right Content
Lorem markdownum insigne...
{{%/* /columns */%}}
```
{{% columns %}}
**Left Content**

Lorem markdownum insigne.

<--->

**Mid Content**

Olympo signis Delphis!

<--->

**Right Content**

Retexi Nereius nova develat stringit, frustra Saturnius uteroque inter!
{{% /columns %}}

## Button
{{% columns %}}
```tpl
{{</* button relref="/" [class="..."] */>}}Get Home{{</* /button */>}}
{{</* button href="https://github.com/alex-shpak/hugo-book" */>}}Contribute{{</* /button */>}}
```
<--->

{{<button relref="/">}}Get Home{{</button>}}
{{<button href="https://github.com/tx0dev/ffxiv">}}Contribute{{</button>}}

{{% /columns %}}
## Details

{{% columns %}}
```tpl
{{</* details "Title" [open] */>}}
## Markdown content
Lorem markdownum insigne...
{{</* /details */>}}
```
<--->

{{% details title="Title" open=true %}}
### HTML content
Lorem markdownum insigne...
{{% /details %}}

{{% /columns %}}

## Hint

{{% columns %}}
```tpl
{{</* hint [info|warning|danger] */>}}
## Markdown content
Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
stringit, frustra Saturnius uteroque inter! Oculis non ritibus Telethusa
{{</* /hint */>}}
```

<--->

{{% hint info %}}
### Markdown content
Lorem markdownum insigne. Olympo signis Delphis! Retexi Nereius nova develat
stringit, frustra Saturnius uteroque inter! Oculis non ritibus Telethusa
{{% /hint %}}

{{% /columns %}}

## Mermaid

{{% columns %}}

```tpl
{{</* mermaid class="optional" >}}
stateDiagram-v2
    State1: The state with a note
    note right of State1
        Important information! You can write
        notes.
    end note
    State1 --> State2
    note left of State2 : This is the note to the left.
{{< /mermaid */>}}
```

<--->

{{< mermaid class="optional" >}}
stateDiagram-v2
    State1: The state with a note
    note right of State1
        Important information! You can write
        notes.
    end note
    State1 --> State2
    note left of State2 : This is the note to the left.
{{< /mermaid >}}

{{% /columns %}}

## Tabs

{{% columns %}}
```tpl
{{%/* tabs */%}}
{{%/* tab "MacOS" */%}} # MacOS Content {{%/* /tab */%}}
{{%/* tab "Linux" */%}} # Linux Content {{%/* /tab */%}}
{{%/* tab "Windows" */%}} # Windows Content {{%/* /tab */%}}
{{%/* /tabs */%}}
```
<--->

{{% tabs %}}
{{% tab "MacOS" %}} ### MacOS Content {{% /tab %}}
{{% tab "Linux" %}} ### Linux Content {{% /tab %}}
{{% tab "Windows" %}} ### Windows Content {{% /tab %}}
{{% /tabs %}}

{{% /columns %}}

## KaTeX

{{% columns %}}

```latex
{{</* katex display=true class="optional" >}}
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
{{< /katex */>}}
```

<--->

{{< katex display=true class="optional" >}}
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
{{< /katex >}}

{{% /columns %}}
