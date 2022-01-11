const { json } = require("body-parser");

const movieRoutes = (app, fs) => {
    // variables
    const dataPath = './data/movies.json';
    
    //All genres
    app.get('/genres', (req, res) => {
      fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
        res.send(JSON.parse(data).genres);
      });
    });

    //Genres Order By Alphabetically ASC 
    app.post('/genres', (req, res) => {
      fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
        
        var resu =[];
        var datas =(JSON.parse(data).genres);
        var obj=Object.keys(datas);
        obj.forEach(function(key){
          resu.push(datas[key])
        });
        resu.sort(function(a, b){
          if(a < b) { return -1; }
          if(a > b) { return 1; }
          return 0;
      })
        res.send(resu);
      });
    });


    //All Movies
    app.get('/movies', (req, res) => {
      fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
        res.send(JSON.parse(data).movies);
      });
    });
  
    //Movie By id : id du film recherche
    app.post('/movie/:id',(req,res) => {
      fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
        res.send(JSON.parse(data).movies[req.params.id-1]);

      });
    });
  
    // Movies Order By ASC (Year)
    app.post('/movies',(req,res) => {
      fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
        var resu =[];
        var datas =(JSON.parse(data).movies);
        var obj=Object.keys(datas);
        obj.forEach(function(key){
          resu.push(datas[key])
        });
        resu.sort(function(a,b){return a.year - b.year});
        res.send(resu);
      });
    });


    // Movies Order By DESC (Year)
    app.post('/movies/desc',(req,res) => {
      fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
        var resu =[];
        var datas =(JSON.parse(data).movies);
        var obj=Object.keys(datas);
        obj.forEach(function(key){
          resu.push(datas[key])
        });
        resu.sort(function(a,b){return  b.year - a.year});
        res.send(resu);
      });
    });


    // Movies de Genre (genre : Nom du genre que vous souhaitez savoir tous les films de ce genre)
    app.post('/movies/:genre',(req,res) => {
      fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
        var resfinal =[];
        var resu =[];
        var datas =(JSON.parse(data).movies);
        var obj=Object.keys(datas);
        obj.forEach(function(key){
          resu.push(datas[key])
        });
        
        for (let movie of datas) {
          if((movie.genres).includes(req.params.genre)) resfinal.push(movie)
              }
        res.send(resfinal);
      });
    });
    
    // Movies du directeur (director : Nom du directeur que vous souhaitez savoir ces films)
    app.post('/movies/director/:director',(req,res) => {
      fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
        var resfinal =[];
        var resu =[];
        var datas =(JSON.parse(data).movies);
        var obj=Object.keys(datas);
        obj.forEach(function(key){
          resu.push(datas[key])
        });
        
        for (let movie of datas) {
          if((movie.director).includes(req.params.director)) resfinal.push(movie)
              }
        res.send(resfinal);
      });
    });

    // Movies Order By DESC (Runtime)
    app.post('/movies/runtime/desc',(req,res) => {
      fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          throw err;
        }
        var resu =[];
        var datas =(JSON.parse(data).movies);
        var obj=Object.keys(datas);
        obj.forEach(function(key){
          resu.push(datas[key])
        });
        resu.sort(function(a,b){return  b.runtime - a.runtime});
        res.send(resu);
      });
    });

        // Movies Order By ASC (Runtime)
      app.post('/movies/runtime/asc',(req,res) => {
          fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
              throw err;
            }
            var resu =[];
            var datas =(JSON.parse(data).movies);
            var obj=Object.keys(datas);
            obj.forEach(function(key){
              resu.push(datas[key])
            });
            resu.sort(function(a,b){return a.runtime - b.runtime });
            res.send(resu);
          });
        });

        // A Movie's Actors (movie : Nom du film que vous souhaitez savoir ces acteurs)
        app.post('/movies/:movie/actors/',(req,res) => {
          fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
              throw err;
            }
            var datas =(JSON.parse(data).movies);
            for (let movie of datas) {
              if((movie.title).includes(req.params.movie))
              var resfinal = movie;
                  }
              res.send(resfinal.actors);
            });
        });

        // A Actor's Movies (actor : Nom de l'acteur que vous souhaitez savoir ces films)

        app.post('/movies/:actor/movies/',(req,res) => {
          fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
              throw err;
            }
            var resfinal =[]
            var datas =(JSON.parse(data).movies);
            for (let movie of datas) {
              if((movie.actors).includes(req.params.actor))
              resfinal.push(movie.title)
                  }
              res.send(resfinal);
            });
        });

  };

  module.exports = movieRoutes;