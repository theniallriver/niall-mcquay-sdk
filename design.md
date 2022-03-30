Hey there.

Sorry in advance for the unstructured approach I took towards this document. It was a long day of work, and this took me another 4 hours, so I'm rushing to finish it up.

After having gone through all of this work once, I would do it a different way the second time.

This exercise made the use case for LibLab very clear for me. None of the work that went into this was very creative. It was tedious, time consuming, and extremely boring. 

I think the design I came up with is great for the end user, but it sure took a long time to write.

Let's dive in.


The entire SDK is defined as a Typescript Class, making it easy for intellisense to give users access to everything right off the bat. 

To get started, users must initialize the class with an API Key.

We have a few private helper methods that are not available to the user.

`getAuthHeader` structures the authorization header for us for all calls that require it. 

`generateQueryParamsString` is used in any method that supports sorting and filtering, and is used to easily structure the param string for the api. It is type safe, which helps users via intellisense, and stops users from passing in unsupported properties, if they are using TypeScript.

Documentation for the public methods can be found in the README.

I decided to design the SDK in this way, because this is how SDKs that I enjoy using are often built. It's often painful for me to use an SDK if it does not have the following things: 

* Typescript Support
* Easy access to all available methods
* Intellisense
* Strict parameter checks

The more intuitive an SDK is for a user, the less time they have to spend shuffling through documentation, so I chose to follow some common patterns. 


I used axios to interface with The One API. I made this choice because axios is easier to use, test, and read than Node’s XMLHTTPRequest API. If this were an actual SDK to be used by millions of people, it might be worth it to replace axios to and be sub-dependency free.

I wrote this sdk assuming that this API has data that is constantly changing. Without that assumption, you could provide an ENUM for each data type, and a list of possible ids to request for, which would make it even easier for the user, and you could catch incorrect ids without making an api request.

There is certainly a way to write this that would require much less code, but the solution I came up with would result in not as friendly of an SDK for the end user.
