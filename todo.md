reference
https://github.com/jaredhanson/passport-twitter
https://github.com/jaredhanson/passport-github
https://github.com/jaredhanson/passport-local

$yo galvinize-express
$npm install
$npm install passport-github --save
npm install passport --save

create auth folder under server folder
create github.js file

STEPS for github passport auth strategy
1. register for new application under personal settings> applications> developer applications. ``http://127.0.0.1:3000`` is local host 3000. We need the client id and the client secret generated and update the github.js file
2. Add requirements in github.js: 
``` 
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
```
2. Set up routers in index.js
3. Add to views index.html
```
<a class="btn btn-default" href="/auth/github" role="button">Login with your Github Account</a>
```
4. Add to routes ``var passport = require('../auth/github.js');``
5. Check out on local host 3000
5. create a model for mongoose
5. add to github.js top
```
var User = require('../models/user');
var mongoose = require('mongoose');
```
5. add to function on github.js
```
function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    var githubUser = {
      username: profile.name,
      email: profile.email
    }
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
```
6. Migrate secret plug ins to a config file or env file. export it out. require it in github.js and then add to .gitignore the config file
7. in env.sh (shell script) you can use as well and the syntax is simply ``export GITHUB_CLIENT_ID=1c93b5ae17f76e22d85b;`` in github.js ``process.env.GITHUB_CLIENT_ID`` add ``env.sh`` to .gitignore file

##Deploy to heroku
1. heroku create name_of_file
2. heroku logs (will show you the errors if it doesn't deploy)
3. heroku config (check config to see if that can be found or env file etc)
4. if cannot find file... set up the client id and client secret in terminal ``heroku config set: GITHUB_CLIENT_ID=1c93b5ae17f76e22d85b ``
5. heroku addons:create mongolab then update user.js under models to match the MONGOLAB_URI instead of just MONGO_URI
-if still issues you prob need to add mongolab
6. git push && git push heroky master


Set up test environment 
1. local 2. pre-prod (production) 3. production

example: https://kyle-auth.herokuapp.com/

