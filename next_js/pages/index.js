import Head from 'next/head'
import {useRouter} from 'next/router';
import useSWR from "swr";

//import sharer
import {
EmailShareButton,
FacebookShareButton,
LinkedinShareButton,
TwitterShareButton,
WhatsappShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

// import bootstrap
import 'bootstrap/dist/css/bootstrap.css'

// Setup headers
let headers = new Headers();
headers.append('Accept', 'application/json');

const initJokes = {
  method: 'GET',
  headers: headers,
};

// Setup SWR
const fetchJokes = (url) => fetch(url, initJokes).then((res) => res.json());


export default function Home(props) {
  const router = useRouter();
  let jokeId = router.query.jokeId;

  let url = "https://icanhazdadjoke.com/";
  console.log(jokeId);

  if(jokeId !== undefined && jokeId !== null && jokeId !== ''){
    url = "https://icanhazdadjoke.com/j/"+jokeId;
  }

  let jokeText = "Loading...";

  let { data, error, mutate } = useSWR(
    url,
    fetchJokes
  );

  if (!error && data && data.status === 200) {
    jokeText = data.joke;
    jokeId = data.id;
  }

  // share url for the joke
  let shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/?jokeId=${jokeId}`;
  let shareQuote = jokeText;


  return (
    <div className="container">
      <Head>
        <title>DadJokes NextJS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          <header className="masthead mb-auto">
            <div className="inner">
              <h3 className="masthead-brand">RDG</h3>
              <nav className="nav nav-masthead justify-content-center">
                <a className="nav-link" href="https://github.com/rawdreeg/DadJokesFromAPI-using-3-Frameworks">Get it on Github</a>
              </nav>
            </div>
          </header>

          <main role="main" className="inner cover">
            
            <h1 className="cover-heading" id="joke">{jokeText}</h1>
            <p className="lead">
              <a href="#" className="btn btn-primary" id="refresh" onClick={()=> {mutate();}}>Grab new joke</a>
            </p>
            <hr/>
            <div className="share-icons">
              <h4>Share This Joke</h4>
              <div className="social">
                
              <FacebookShareButton
                url={shareUrl}
                quote={shareQuote}
                className="sharer button"
              >
                <FacebookIcon size={32} round /> Facebook
              </FacebookShareButton>

              <TwitterShareButton
                url={shareUrl}
                quote={shareQuote}
                className="sharer button"
              >
                <TwitterIcon size={32} round /> Twitter
              </TwitterShareButton>

              <LinkedinShareButton
                url={shareUrl}
                quote={shareQuote}
                className="sharer button"
              >
                <LinkedinIcon size={32} round /> LinkedIn
              </LinkedinShareButton>

              <WhatsappShareButton
                url={shareUrl}
                quote={shareQuote}
                className="sharer button"
              >
                <WhatsappIcon size={32} round /> Whatsapp
              </WhatsappShareButton>

              <EmailShareButton
                url={shareUrl}
                quote={shareQuote}
                className="sharer button"
              >
                <EmailIcon size={32} round /> Email
              </EmailShareButton>
              </div>
            </div>
          </main>

          <footer className="mastfoot mt-auto">
            <div className="inner">
              <p>By <a href="http://rawdreeg.com">Rodrigue Tusse</a></p>
            </div>
          </footer>
        </div>
      </div>

      <style jsx global>{`
       /*
        * Globals
        */

        /* Links */
        a,
        a:focus,
        a:hover {
          color: #fff;
        }

        /* Custom default button */
        .btn-secondary,
        .btn-secondary:hover,
        .btn-secondary:focus {
          color: #333;
          text-shadow: none; /* Prevent inheritance from body */
          background-color: #fff;
          border: .05rem solid #fff;
        }

        .cover-container {
          max-width: 42em;
        }

       /*
        * Header
        */
        .masthead {
          margin-bottom: 2rem;
        }

        .masthead-brand {
          margin-bottom: 0;
        }

        .nav-masthead .nav-link {
          padding: .25rem 0;
          font-weight: 700;
          color: rgba(255, 255, 255, .5);
          background-color: transparent;
          border-bottom: .25rem solid transparent;
        }

        .nav-masthead .nav-link:hover,
        .nav-masthead .nav-link:focus {
          border-bottom-color: rgba(255, 255, 255, .25);
        }

        .nav-masthead .nav-link + .nav-link {
          margin-left: 1rem;
        }

        .nav-masthead .active {
          color: #fff;
          border-bottom-color: #fff;
        }

        @media (min-width: 48em) {
          .masthead-brand {
            float: left;
          }
          .nav-masthead {
            float: right;
          }
        }

        h1#joke {
          margin-bottom: 1em;
          margin-top: 1em;
        }        

        /*
        * Cover
        */
        .cover {
          padding: 0 1.5rem;
        }
        .cover .btn-lg {
          padding: .75rem 1.25rem;
          font-weight: 700;
        }


       /*
        * Footer
        */
        .mastfoot {
          color: rgba(255, 255, 255, .5);
        }
        .social{

          margin-bottom: 2rem;
        }
        div.social button {
          padding-right: 15px !important;

        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          height: 100%;
          background-color: #333;
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        body > div{
          display: -ms-flexbox;
          display: flex;
          color: #fff;
          text-shadow: 0 .05rem .1rem rgba(0, 0, 0, .5);
        }

        * {
          box-sizing: border-box;
        }

      `}</style>
    </div>
  )
}


