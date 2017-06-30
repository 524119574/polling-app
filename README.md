# instagram-autoliker
This is a project that I am currently working on. 

The main purpose of the project is to automate the nuance of browsing the instagram. I am trying to use node.js to like the post periodically.

Below is some reference of what I have done:
We can easilly find the API end point [here](https://www.instagram.com/developer/endpoints/).
As we can see from the Instagram reference site that the instagram access token is required to use the instagram API. There has been two way to get the access token:

1. [Use your sandbox mode APP](http://jelled.com/instagram/access-token)
2. [Use this site](http://services.chrisriversdesign.com/instagram-token/)

The first optinion is not sufficient, since it is in sandbox mode so we can not access the real world data.
The second optinion is not sufficient for our purpose as well, since it dosen't grant the permission to like other's post. We can only view other's post.

After searching on the Github, we can easily find several repo that provide us an interface in node.js:
1. [Instagram Private Api](https://github.com/huttarichard/instagram-private-api)
2. [Instagram Node](https://github.com/totemstech/instagram-node)

The second option required us to have a access token and we need to publish our APP under the Instagram review which makes the process super cumbersome. We will need to register a client in the Instagram website, using the sandbox mode first which means we cannot access any real world data. In order to access the real world data, we will have to publish our app which require submit many files including the screencast and detailed explanation of the function of the app. A more detailed explanation can be found [here](https://www.instagram.com/developer/review/) Thus we shall abort this option.

So, in our project, we decided to use the first one since we can access the real world data much more easily.

Other useful link:
This is an [article](https://medium.freecodecamp.com/i-wanted-to-see-how-far-i-could-push-myself-creatively-so-i-redesigned-instagram-1ff99f28fa8b) on how to redesign the facebook app, maybe I could do just that.

To be continued...
