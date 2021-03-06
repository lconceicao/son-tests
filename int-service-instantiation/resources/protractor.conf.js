/**
 * Copyright (c) 2015 SONATA-NFV [, ANY ADDITIONAL AFFILIATION]
 * ALL RIGHTS RESERVED.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * Neither the name of the SONATA-NFV [, ANY ADDITIONAL AFFILIATION]
 * nor the names of its contributors may be used to endorse or promote 
 * products derived from this software without specific prior written 
 * permission.
 * 
 * This work has been performed in the framework of the SONATA project,
 * funded by the European Commission under Grant number 671517 through 
 * the Horizon 2020 and 5G-PPP programmes. The authors would like to 
 * acknowledge the contributions of their colleagues of the SONATA 
 * partner consortium (www.sonata-nfv.eu).* dirPagination - AngularJS module for paginating (almost) anything.
 */

var HtmlScreenshotReporter = require('protractor-jasmine2-html-reporter');

var reportName;

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',  
  seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.52.0.jar',    

  suites: {
	  service_Instantiation: ['./serviceInstantiationE2E.js'],	     
  },
  
  capabilities: {
  'browserName': 'phantomjs',
    version: '',
    platform: 'ANY',
	  'phantomjs.binary.path': './node_modules/phantomjs-prebuilt/bin/phantomjs',
	  //'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG', '--logfile=./E2E_tests/ghostdriver.log'],
    'phantomjs.cli.args': ['--web-security=false', '--ignore-ssl-errors=true'/*, '--webdriver-loglevel=DEBUG', '--webdriver-logfile=./E2E_tests/protractor.log'*/]
  },
     
  jasmineNodeOpts: {
    defaultTimeoutInterval: 900000
  },
  
  onPrepare: function() {
     process.argv.forEach((val, index, array) => {
        if (`${val}`=='--suite') {
                reportName = process.argv[`${index+1}`];
        }
     });    
     jasmine.getEnv().addReporter(
        new HtmlScreenshotReporter({
          savePath: '../reports/',
          filePrefix: reportName
        })
     );
   }
}