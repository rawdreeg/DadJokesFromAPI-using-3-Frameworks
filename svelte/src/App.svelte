<script>
	export let joke = 'Loading...';
	// get query string
	let query = new URLSearchParams(window.location.search);
	// get joke id
	let id = query.get('jokeId');

	// default url
	let defaultUrl = window.location.protocol + '//' + window.location.host;

	// if id is not null, get joke by id
	let url = "https://icanhazdadjoke.com/";
	if (id) {
		url += "j/" + id;
	}

	// Setup headers
	let headers = new Headers();
	headers.append('Accept', 'application/json');

	const initJokes = {
	method: 'GET',
	headers: headers,
	};

	// Fetches a joke

	let fetchJokes = (url) => fetch(url, initJokes).then((res) => res.json());


	function getJoke( reset = false) {

		// if reset is true, reset joke
		if (reset == true) {
			window.history.replaceState({}, '', defaultUrl);
			window.location.reload();
		}
		// Joke data
		let jokeData = fetchJokes(url).then((data) => {
			joke = data.joke;
			id = data.id;
		});
	}

	// init
	getJoke();


	</script>

	<div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
		<header class="masthead mb-auto">
		  <div class="inner">
			<h3 class="masthead-brand">RDG</h3>
			<nav class="nav nav-masthead justify-content-center">
			  <a class="nav-link" href="https://github.com/rawdreeg/DadJokesFromAPI-using-3-Frameworks">Get it on Github</a>
			</nav>
		  </div>
		</header>
	
		<main role="main" class="inner cover">
		  <h1 class="cover-heading" id="joke">{joke}</h1>
		  <p class="lead">
			<a href="#" class="btn btn-primary" id="refresh"  on:click={() => getJoke(true)}>Grab new joke</a>
		  </p>
		  <hr/>
		  <div class="share-icons">
			<h3>Share This Post</h3>
			<div class="social">
			  <a href="#" id="share-wa" class="sharer button" data-url={defaultUrl + '/?jokeId=' + id }  data-title={joke} data-sharer="whatsapp"><i class="fa fa-3x fa-whatsapp"></i></a>
			  <a href="#" id="share-fb" class="sharer button" data-url={defaultUrl + '/?jokeId=' + id }  data-title={joke} data-sharer="facebook"><i class="fa fa-3x fa-facebook-square"></i></a>
			  <a href="#" id="share-tw" class="sharer button" data-url={defaultUrl + '/?jokeId=' + id }  data-title={joke} data-sharer="twitter"  data-via="rawdreeg"><i class="fa fa-3x fa-twitter-square"></i></a>
			  <a href="#" id="share-li" class="sharer button" data-url={defaultUrl + '/?jokeId=' + id }  data-title={joke} data-sharer="linkedin"><i class="fa fa-3x fa-linkedin-square"></i></a>
			  <a href="#" id="share-em" class="sharer button" data-url={defaultUrl + '/?jokeId=' + id }  data-title={joke} data-sharer="email"><i class="fa fa-3x fa-envelope-square"></i></a>
			</div>
		  </div>
		</main>
	
		<footer class="mastfoot mt-auto">
		  <div class="inner">
			<p>By <a href="http://rawdreeg.com">Rodrigue Tusse</a></p>
		  </div>
		</footer>
	  </div>

<style>
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
      text-shadow: none; /* Prevent inheritance from `body` */
      background-color: #fff;
      border: .05rem solid #fff;
    }


    /*
    * Base structure
    */

    html,
    body {
      height: 100%;
      background-color: #333;
    }

    body {
      display: -ms-flexbox;
      display: flex;
      color: #fff;
      text-shadow: 0 .05rem .1rem rgba(0, 0, 0, .5);
      box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5);
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
      margin-bottom: 10%;
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

	.sharer {
    padding-right: 15px;
}
</style>