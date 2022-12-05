# HOPE Project
 
 ![image](https://user-images.githubusercontent.com/112099395/205650970-dabdf533-8a1b-4ee9-9657-9de6e6d3331c.png)

Price of Energy is a news application focusing recolecting articles that touch upon energy prices all around the globe. Our purpose is to be your go to place to learn the current status of your region in order to minimize surprises and assure that our members are always prepared and in the know. The root of all knowledge is in education and we seek to spread information in order to minimize opression that can be caused by the rising energy prices. To navigate our website/app you can filter through any of the available regions: Americas, Asia and Europe and then you can filter through the news sources we currently have access to through our 3rd party API. If you are in no need of filtering you can also easily access all the news articles on our site by clicking the "All Articles" button on our home page. Additionally, you can sign up to our newsletter to receive updates on the articles published for a specific region of your choosing.

# Using APIs
In this project we were tasked to use an API to make our third party API and also display information using that API. These APIs allowed us to see articles and sources of news. This API could be fetched in many ways:
- Regions: /regions/*Region*/
- Source: /sources/*Source*/
- All Articles: /

All of these situations are very similar to fetch the API, this allowed us to build a function that could take either a region, or a source, or nothing at all and return one of the 3 options above. This function required promises to be fulfilled which allowed us to use async/await. Using async/await, we could wait for those promises/API data to be returned and then run the rest of our code.

# Routes
Throughout this project we used many routes that would route you based on your needs. These routes included:
Regions: 
- Europe
- Americas
- Asia

Sources:
- CNN
- CNBC
- Globe Mail
- ABP News
- Zee News
- Economic Times
- Guardian
- Times
- Telegraph
- Sky News
- Reuters
- Economists

