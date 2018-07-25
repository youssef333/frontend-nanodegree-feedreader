/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* The 1st ,2nd and 3rd tests suite 
    *  This suite is all about the RSS feeds definitions, 
    *  the allFeeds variable in our application.
    */

    var originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;


    describe('RSS Feeds', function() {
        /* The first test - it tests to make sure that the
         * allFeeds variable has been defined and it is non empty
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         function iterateObjs(obj){
            it('has urls', function(){
                expect(obj.url).toBeTruthy();
            })

            it('has names', function(){
                expect(obj.name).toBeTruthy();
            })
        }

        allFeeds.forEach(function(x){
            iterateObjs(x)
        })
    });


    /* Defining a new test suite named "The menu" */
    describe('The menu', function() {
    	var body, menuIcon;
        beforeEach(function() {
            body = $('#body');
            menuIcon = $('.menu-icon-link');
        });

        /* The 4th test - that ensures the menu element is
         * hidden by default. It done by analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         it('is hidden by default' , function() {
         	expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* The 5th test  - that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * have two expectations: the first shows if the menu display when
          * clicked and does it hide when clicked again.
          */

          it('ensures the menu changes when clicked', function() {

            // Menu is visible on first click
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // Menu is hidden on second click
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
   });

    /* Defining a new test suite named "Initial Entries" */
    describe('Initial Entries' , function() {
    	var feedsData ;
        beforeEach(function(done) {
            loadFeed(0, function() {
                feedsData = $('.feed .entry');
                done();
            });           

        /* The 6th test - that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         it('Ensure when loadFead is called, there is at least .entry element in .feed container', function(done) {
            expect(feedsData.length >= 1 ).toBeTruthy();
            done();
         });
    });

    });
    /*  Defining a new test suite named "New Feed Selection" */
    describe("New Feed Selection" , function() {
    	 var firstFeed,
             secondFeed; 

        /* The 7th test - that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         var originalTimeout;

        beforeEach(function(done) {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;

                loadFeed(0, function() {
                    firstFeed = $('.feed').html();     
                    loadFeed(1, done);
                });           
        });

        it('Ensure when New Feed is Loaded the content changes', function(done){
           secondFeed = $('.feed').html();
            expect(firstFeed).not.toBe(secondFeed);
            setTimeout(function(){
                done();
                }, 10000);
        });

        afterEach(function() {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
}());
