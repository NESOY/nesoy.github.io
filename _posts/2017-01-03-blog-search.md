---
layout: post
title: 검색엔진에 블로그 내용 올리기
categories: [Jekyll]
excerpt: " "
comments: true
share: true
tags: [Jekyll,Github]
date: 2017-01-03
---

# **구글 네이버에 블로그 글 등록하기**

## 1. Jekyll Sitemap 만들기
- #### /sitemap.xml 만들기

{% highlight xml %}
---
layout: null
---
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  {% for post in site.posts %}
    <url>
      <loc>{{ site.url }}{{ post.url }}</loc>
      {% if post.lastmod == null %}
        <lastmod>{{ post.date | date_to_xmlschema }}</lastmod>
      {% else %}
        <lastmod>{{ post.lastmod | date_to_xmlschema }}</lastmod>
      {% endif %}

      {% if post.sitemap.changefreq == null %}
        <changefreq>weekly</changefreq>
      {% else %}
        <changefreq>{{ post.sitemap.changefreq }}</changefreq>
      {% endif %}

      {% if post.sitemap.priority == null %}
          <priority>0.5</priority>
      {% else %}
        <priority>{{ post.sitemap.priority }}</priority>
      {% endif %}

    </url>
  {% endfor %}
</urlset>
{% endhighlight %}

- #### Github Sitemap.xml 확인하기
  ![No Image](/assets/20170103/sitemap.PNG)

- #### Local Sitemap.xml (127.0.0.1:4000/sitemap.xml) 확인하기
  ![No Image](/assets/20170103/sitemap2.PNG)

## 2. Robots.txt 만들기
- #### /robots.txt 만들기

{% highlight txt %}
User-agent: *
Allow: /

Sitemap: http://nesoy.github.io/sitemap.xml
{% endhighlight %}

## 3. Google Search Console 등록
- ##### [https://www.google.com/webmasters/#?modal_active=none](https://www.google.com/webmasters/#?modal_active=none)

- #### Search Console 들어가기
![No Image](/assets/20170103/googleSearch.PNG)

- #### 속성추가하기
![No Image](/assets/20170103/googleSearch2.PNG)

- #### Blog URL입력하기
![No Image](/assets/20170103/googleSearch3.PNG)

- #### HTML 다운받아서 Github에 올려서 인증받기
![No Image](/assets/20170103/googleSearch4.PNG)

- #### Sitemap 추가하기
![No Image](/assets/20170103/googleSearch5.PNG)

## 4. Naver 등록하기
- #### [http://webmastertool.naver.com/](http://webmastertool.naver.com/)
- #### 위에 방법과 비슷하게 진행한다.


## 참고

<http://dveamer.github.io/homepage/SubmitSitemap>
