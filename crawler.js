//try to check for urls before continuing
//TODO - regex works, but returns true every time
function checkUrls(data) {
  let pattern = new RegExp('^((http?:)?\\/\\/)?')
    if (!pattern.test(data)) {
    alert('No valid URLs found.');
    return false;
    } else {
        //gathers address urls from each list as an origin for crawler
        const addressUrls = function(data) {
          let urls = [];
          
          //pulls in data using same order as json object, sets it to objLength for iteration
          const objLength = Object.values(data.pages);
          
          //iteration through address urls, moving data into urls array
          for (let i = 0; i < objLength.length; i++) {
            urls.push(data.pages[i].address)
          }
          return urls
          };

        function webCrawler(data) {
          let success = [];
          let skipped = [];
          let errors = [];
          
          //grab starting point from getUrls
          const linkUrls = addressUrls(data);
          
          //iterate through links, pushing links into array if not a duplicate
          for (let i = 0; i < linkUrls.length; i++) {
            const links = data.pages[i].links
           
            //TODO - maybe use sets?
            links.forEach(function(el) {
              if (!success.includes(el) && !success.includes(linkUrls[i])) {
                success.push(linkUrls[i])
              }
              
              if (!linkUrls.includes(el)) {
                errors.push(el)
              } else if (!success.includes(el)) {
                success.push(el)
              } else if (!skipped.includes(el)) {
                skipped.push(el)
              }
            });
          }

          console.log('Success:' + success);
          console.log('Skipped:' + skipped);
          console.log('Error:' + errors);

          //clears values of arrays for net2 data
          success = [];
          skipped = [];
          errors = [];
          }
          webCrawler(data);
        }        
}

const net1 = {
  "pages": [
    {
      "address":"http://foo.bar.com/p1",
      "links": ["http://foo.bar.com/p2", "http://foo.bar.com/p3", "http://foo.bar.com/p4"]
    },
    {
      "address":"http://foo.bar.com/p2",
      "links": ["http://foo.bar.com/p2", "http://foo.bar.com/p4"]
    },
    {
      "address":"http://foo.bar.com/p4",
      "links": ["http://foo.bar.com/p5", "http://foo.bar.com/p1", "http://foo.bar.com/p6"]
    },
    {
      "address":"http://foo.bar.com/p5",
      "links": []
    },
    {
      "address":"http://foo.bar.com/p6",
      "links": ["http://foo.bar.com/p7", "http://foo.bar.com/p4", "http://foo.bar.com/p5"]
    }
  ]
}

const net2 = {
  "pages": [
      {
      "address":"http://foo.bar.com/p1",
      "links": ["http://foo.bar.com/p2"]
    },
    {
      "address":"http://foo.bar.com/p2",
      "links": ["http://foo.bar.com/p3"]
    },
    {
      "address":"http://foo.bar.com/p3",
      "links": ["http://foo.bar.com/p4"]
    },
    {
      "address":"http://foo.bar.com/p4",
      "links": ["http://foo.bar.com/p5"]
    },
    {
      "address":"http://foo.bar.com/p5",
      "links": ["http://foo.bar.com/p1"]
    },
    {
      "address":"http://foo.bar.com/p6",
      "links": ["http://foo.bar.com/p1"]
    }
  ]
}

checkUrls(net1);
checkUrls(net2);
