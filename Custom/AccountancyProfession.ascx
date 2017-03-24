<%@ Control Language="C#" %>

<div runat="server" class="sf_cols">
  <div class="sf_colsOut" data-placeholder-label="Content">
    <div runat="server" class="sf_colsIn">

      <script type="text/ng-template" id="/quizTemp.html">
        <div class="intro text-center animate-slide" ng-hide="inProgress">
        <div class="container">
        <div class="row">
        <div class="col-md-offset-1 col-md-10">
        <img src="/images/default-source/appsquiz/topper.png">
        <h1>Which accountancy profession suits you?</h1>
        <p>Have you thought about becoming an Accountant, but don't know whether you'd be better as a Financial or Management Accountant? Don't know the difference between an Auditor or a Bookkeeper?</p>
        <p>Take this short quiz to discover the accounting careers and salaries that might suit you.</p>
        <a class="kaplan-btn" ng-click="start()">Take the quiz</a>
        </div>
        </div>
        </div>
        </div>
        <div class="quiz-area animate-slide" ng-show="inProgress && !result">
        <div class="container text-center">
        <div class="row question" ng-repeat="(key, question) in questions" ng-class="{'visible': isCurrentIndex(key), 'back': !orientation}">
        <div class="col-md-offset-1 col-md-10">
        <p class="number">{{key + 1}}/9</p>
        <img src="{{question.image}}" class="big">
        <h2 class="text">{{question.text}}</h2>
        <rzslider rz-slider-model="slider.value" rz-slider-options="slider.options" ng-show="key%2 == 0"></rzslider>
        <div class="options">
          <div ng-repeat="option in question.options" ng-class="{'slider': key%2 == 0}">
            <div class="option" ng-click="selectOption(key, $index)" ng-class="{'selected': toggleOption(key, $index), 'letter': key%2 == 1}" data-id="{{$index}}"><span ng-show="key%2 == 1">{{$index | numberToAlphabet}}</span>{{option}}</div>
          </div>
        </div>
        <a ng-click="prevQuestion()" class="prev-question" ng-hide="{{key == 0}}">previous</a>
        <a ng-click="nextQuestion()" class="kaplan-btn next-question">next</a>
        </div>
        </div>
        </div>
        </div>

        <div class="animate-slide" ng-show="result">
        <div class="container">
        <div class="row">
        <div class="col-md-12 text-center">
        <h2 class="result-header">{{resultHeader}}</h2>
        </div>
        <div class="col-md-4 col-sm-12 col-xs-12">
        <h3 class="sub-header">{{resultSubHeader}}</h3>
        <p class="result-text">{{resultText}}</p>
        <a class="kaplan-cta-btn" href="{{resultURL}}"><span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span><span class="btn-text">{{resultURLText}}</span></a>
        </div>
        <div class="col-md-8 col-sm-10 col-xs-12">
        <canvas id="myChart" class="desktop"></canvas>
        <h4 class="explanation">Click results to view a career guide</h4>
        <div class="axis management-accountant" ng-class="{'winner': resultIndex == 0}"><a class="axis-text" href="http://www.kaplan.co.uk/insights/accountancy-tax/detail/insights/2016/09/20/how-to-become-a-management-accountant" target="_blanc">Management Accountant</a></div>
        <div class="axis bookkeeper" ng-class="{'winner': resultIndex == 1}"><a class="axis-text" href="http://www.kaplan.co.uk/insights/accountancy-tax/detail/insights/2016/09/20/how-to-become-a-bookkeeper" target="_blanc">Bookkeeper</a></div>
        <div class="axis auditor" ng-class="{'winner': resultIndex == 2}"><a class="axis-text" href="http://www.kaplan.co.uk/insights/accountancy-tax/detail/insights/2016/09/20/how-to-become-an-auditor" target="_blanc">Auditor</a></div>
        <div class="axis financial-accountant" ng-class="{'winner': resultIndex == 3}"><a class="axis-text" href="http://www.kaplan.co.uk/insights/accountancy-tax/detail/insights/2016/09/20/how-to-become-a-financial-accountant" target="_blanc">Financial Accountant</a></div>
        <div class="axis tax-technician" ng-class="{'winner': resultIndex == 4}"><a class="axis-text" href="http://www.kaplan.co.uk/insights/accountancy-tax/detail/insights/2016/09/20/how-to-become-a-tax-technician" target="_blanc">Tax Technician</a></div>
        </div>
        </div>
        </div>
        </div>
        </script>    
    </div>
  </div>
</div>
