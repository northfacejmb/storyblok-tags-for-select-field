# Storyblok Tags for Select or Multi-select

Unfortunatly Storyblok doesn't make it easy to handle tags for select/multi-select fields directly in the UI. You have to manually add tags when creating a new entry, and then you can select them from the list of existing entries. So if you want to do something like letting the user filter all entries by tag, there isn't a good way to do it. While there are options out there to handle this by creating a field plugin like [Storyblok-fieltype-tags-select](https://github.com/dohomi/storyblok-fieldtype-tags-select?tab=readme-ov-file) (which wasn't working for me), this option is lightweight and perhaps more durable. 

This is a workaround to just host your own api to fetch the tags using the tags endpoint https://www.storyblok.com/docs/api/content-delivery/v2/tags/retrieve-multiple-tags and display them in the storyblok select or multi-select UI. 


Just create an endpoint that sends back the tags in a key value pair format, then use this data to populate your dropdown list on Storyblok's edit/create page for selecting multiple values from these options (you can also add more filters if needed). This way you will have all of them and they are easily selectable. 

You just need to ensure that the endpoint you use has the preview token as the publish token doesn't seem to work. Vercel makes this easy, from the select or multi-select fields, just choose "external Json" then your dev url /api/tags and you're set. 

![Setup ](./source.png)

![Result ](./result.png)

