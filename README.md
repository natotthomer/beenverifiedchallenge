# README

## Shortening Algorithm

Having done some research into possible ways to create shortened URLs, I was at a bit of a loss. I knew I had to come up with a way of making some sort of nonsense string that didn't need to be human-readable. I knew I'd have to use some sort of encoding mechanism, but I wasn't sure exactly how. Some articles and StackOverflow posts suggested using SHA256 or MD5, but none of these methods felt like they'd actually create short URLs (they'd just create super random, non-human-readble URLs).

And then I came across the idea of bijective functions and Base62 encoding. I implicitly knew that something like bijective functions would be needed, but I didn't have a word for it. Essentially it means that for every input string there is one and only one output string AND for every output string there is one and only one possible input string. It's a one-to-one mapping from one system/standard to the other. Similarly to how every member in the Decimal number set has one and only one equivalent in Binary (and the opposite), for every member in the Decimal number set there is one and only one equivalent in the Base62 number set. The only difference is that instead of the 2-character alphabet used in Binary, or the 10-character alphabet used in Decimal, Base62 uses a 62-character alphabet, allowing the same information to be squeezed into fewer digits.

When asked to build a link, I first check to see if there's a link with that input URL (in order to save room for more URLs in the system). If there is no record in the database, I build a new instance of the Link model and then, using the instance's Primary Key, I generate a brand new Base62 equivalent, saving that as the `shorturl` attribute on the instance. Every instance of Link will have a unique ID, and therefore a unique `shorturl`.

## Getting the App running locally

Follow these steps. I don't have a backup computer on which to verify this, so I may have some of this wrong. Basically we want to install the gems, install Redis, migrate the database, spin up the Rails server, then the Redis server, and then spin up Sidekiq.

- `git clone git@github.com:natotthomer/beenverifiedchallenge.git`
- `cd beenverifiedchallenge`
- `bundle install`
- `brew install redis`
- `rake db:migrate`
- `rails server`
- in a new terminal window (in the same directory): `redis-server`
- in a third terminal window (in the same directory): `bundle exec sidekiq`

If all goes well, you should be able to cURL or use Postman to make requests to the server and get back results.


## Some cURL commands:

- new short URL: `curl -d 'link[long_url]=ENTERLONGURLHERE' localhost:3000/api/links`
  - NOTE: the result will not include the title attribute (it will be null) since the Sidekiq worker probably hasn't finished by the time the response is sent back to the client.
- to use short URL `curl -L localhost:3000/ENTERSHORTURLHERE`
- for list of top URLs `curl localhost:3000/api/top`
- for full list of URLs, `curl localhost:3000/api/links`

## Live site

You can find the live version of the app (the headless version of the app, that is), at `shorturl-bv.herokuapp.com`. Like with the local version, you can access the API via `shorturl-bv.herokuapp.com/api/` and then with the appropriate url (`/links`, `/top`, etc.)

## Part 2 updates:

If the installation for the backend went well, to install the frontend locally:
- in a fourth terminal window (in the same directory): `npm install`
- `webpack`

If you navigate to `localhost:3000`, you'll find a simple form to add new URLs to. At `localhost:3000/pages/top`, you'll find a list of the top 100 most popular shortURLs. All URLs are accepted, regardless of whether they are valid. I couldn't figure out a system that I liked for checking whether or not a URL is valid (regex validations are pretty brittle and I was running into CORS issues and I wanted to get this in ASAP). The very first thing I'd do is add some sort of frontend validation that the URL worked so that the user would know immediately (rather than have that work happen in the Sidekiq worker or the backend altogether). Then I'd clean up the styles and design, adding a custom flash message telling the user whether the URL is valid or not. 