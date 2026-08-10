**DustySpecials Website & App** 


DustySpecials is my second major cloud project. It solves a problem I had back in university: wasting time jumping between different store websites and PDFs just to compare grocery prices. I built this app to aggregate weekly specials from major South African stores like SPAR, Woolworths, Pick n Pay, and Checkers so shoppers can find the best deals in one place.

Building on what I learned with DustyThrifts, this project marks my step up from basic static hosting into event-driven serverless architectures, database integration and automated cloud workflows on AWS.

**Built with**

- Frontend: HTML5, CSS3, JavaScript (ES6+)
- Version Control: Git, GitHub (Feature branch workflow, Pull Requests)
- Cloud Infrastructure: AWS

**AWS Services** 

- Amazon S3: Hosts static web assets and stores store catalogue PDFs securely.
- Amazon CloudFront: Delivers content fast via edge locations using HTTPS.
- Amazon Route 53: Handles custom domain management and DNS routing.
- AWS Certificate Manager (ACM): Provisions SSL/TLS certificates.
-	AWS IAM: Enforces strict least-privilege policies and Origin Access Control (OAC)
-	DynamoDB (In Progress): NoSQL database for store prices and item categories.
-	Lambda & EventBridge (In Progress): Runs serverless background jobs to automate weekly updates.


**CI/CD Workflow**
- main Branch: Holds stable production code.
-	Feature Branches: Used to build and test new features safely.
-	GitHub Actions: Automatically syncs merged code to S3 and invalidates the CloudFront cache.


**Future Plans**

- Migrate deal data into Amazon DynamoDB.
- Build automated PDF price extraction using AWS Lambda.
-	Add a digital shopping list that calculates the cheapest overall basket.
-	Add a loyalty card wallet feature.
- Build a cross-platform mobile app.

**Personal Notes**

I will make more changes soon and for noewthis is what I have, I am also going to start approaching the grocery stores asking if they could share the data of specials a day before if possible. My biggest hurdle is going to be creating a data base for users to search and I need to find a solutions that’s quick so that I do not spend days before updating specials on the website. 
