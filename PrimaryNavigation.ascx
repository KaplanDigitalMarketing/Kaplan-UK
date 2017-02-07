<%@ Control Language="C#" AutoEventWireup="true" CodeFile="PrimaryNavigation.ascx.cs" Inherits="PrimaryNavigation" %>

<div class="container non-mobile-nav-container">
    <div class="col-md-12">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" id="menu-toggle" data-toggle="slide" data-target="#navbar-content" aria-expanded="false">
                <span class="sr-only">Menu</span>
            </button>
            <a class="navbar-brand" href="/">Kaplan</a>
        </div>
        <div class="group" id="navbar-content">
            <nav class="group">
                <div class="navbar-top-support" id="navbar-top-support">
                    <ul class="pages-list">
                        <li><a href="#site-search" class="page-title">Search</a></li>
                        <li><a href="https://mykaplan.co.uk/" class="page-title">MyKaplan</a></li>
                    </ul>
                </div>
                <div class="navbar-top-level" id="navbar-top-level">
                    <h2 class="navbar-heading"><a href="/" class="home-link">Home</a></h2>
                    <ul class="pages-list" role="menubar">
                        <li role="menuitem" tabindex="0" aria-haspopup="true">
                            <a href="/lpd" class="top-level-title page-title">Leadership &amp; Professional Development </a>
                            <div id="lpd-nav-item" class="navbar-sub-item">
                                <h2 class="navbar-heading">Leadership &amp; Professional Development</h2>
                                <a href="#navbar-top-level" class="navbar-back">Back <span>›</span></a>
                                <div class="nav-block">
                                    <ul class="pages-list" aria-label="submenu">
                                        <li><a href="/lpd/overview" class="page-title">Overview</a></li>
                                        <li><a href="/lpd/our-approach" class="page-title">Our approach</a></li>
                                        <li><a href="/lpd/technical-competence" class="page-title">Technical competence</a></li>
                                        <li><a href="/lpd/behavioural-confidence" class="page-title">Behavioural confidence</a></li>
                                        <li><a href="/lpd/our-team" class="page-title">Our team</a></li>
                                        <li><a href="/lpd/success-stories" class="page-title">Success stories</a></li>
                                        <li><a href="/lpd/global-reach" class="page-title">Global reach</a></li>
                                        <li><a href="/lpd/diagnostics" class="page-title">Diagnostics</a></li>
                                        <li><a href="/insights/leadership-professional-development" class="page-title">Insights</a></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li role="menuitem" tabindex="-1" aria-haspopup="true">
                            <a href="/qualifications" class="top-level-title page-title">Professional Qualifications</a>
                            <div class="navbar-sub-item three-col-sub-item">
                                <h2 class="navbar-heading">Professional Qualifications</h2>
                                <a href="#navbar-top-level" class="navbar-back">Back <span>›</span></a>
                                <div class="nav-block">
                                    <div class="column-block no-top-border-block">
                                        <h3 class="nav-section-heading next-page">Accountancy and Tax</h3>
                                        <div class="navbar-sub-child-item">
                                            <a href="#navbar-top-level" class="navbar-back navbar-sub-back">Back <span>›</span></a>
                                            <ul class="pages-list">
                                                <li><a href="http://financial.kaplan.co.uk/TrainingandQuals/Accountancy/AAT/Pages/default.aspx" target="_blank" class="page-title">AAT</a></li>
                                                <li><a href="http://financial.kaplan.co.uk/TrainingandQuals/Accountancy/ACCA/Pages/default.aspx" target="_blank" class="page-title">ACCA</a></li>
                                                <li><a href="http://financial.kaplan.co.uk/TrainingandQuals/Accountancy/ACA(ICAEW)/Pages/default.aspx" target="_blank" class="page-title">ACA(ICAEW)</a></li>
                                                <li><a href="http://financial.kaplan.co.uk/TrainingandQuals/Accountancy/att/Pages/default.aspx" target="_blank" class="page-title">ATT</a></li>
                                                <li><a href="http://financial.kaplan.co.uk/TrainingandQuals/Accountancy/CIMA/Pages/default.aspx" target="_blank" class="page-title">CIMA</a></li>
                                                <li><a href="http://financial.kaplan.co.uk/TrainingandQuals/Accountancy/cfab/Pages/default.aspx" target="_blank" class="page-title">CFAB(ICAEW)</a></li>
                                                <li><a href="http://financial.kaplan.co.uk/TrainingandQuals/Accountancy/bookkeeping/Pages/default.aspx" target="_blank" class="page-title">Bookkeeping</a></li>
                                                <li><a href="http://financial.kaplan.co.uk/TrainingandQuals/Accountancy/CIPFA/Pages/default.aspx" target="_blank" class="page-title">CIPFA</a></li>
                                                <li><a href="http://financial.kaplan.co.uk/TrainingandQuals/Accountancy/icb/Pages/default.aspx" target="_blank" class="page-title">ICB</a></li>
                                                <li><a href="http://financial.kaplan.co.uk/TrainingandQuals/Accountancy/FIA/Pages/default.aspx" target="_blank" class="page-title">FIA</a></li>

                                            </ul>
                                        </div>
                                    </div>
                                    <div class="column-block center-column-block">
                                        <h3 class="nav-section-heading">Banking and Financial Services</h3>
                                        <div class="navbar-sub-child-item">
                                            <a href="#navbar-top-level" class="navbar-back navbar-sub-back">Back <span>›</span></a>
                                            <ul class="pages-list">
                                                <li><a href="http://financial.kaplan.co.uk/TrainingandQuals/Financialservices/CAIA/Pages/default.aspx" class="page-title" target="_blank">CAIA</a></li>
                                                <li><a href="http://financial.kaplan.co.uk/TrainingandQuals/Financialservices/cemap/Pages/default.aspx" class="page-title" target="_blank">CeMAP</a></li>
                                                <li><a href="http://financial.kaplan.co.uk/TrainingandQuals/Financialservices/CFA/Pages/default.aspx" class="page-title" target="_blank">CFA</a></li>
                                                <li><a href="http://financial.kaplan.co.uk/TrainingandQuals/Financialservices/IOC/Pages/default.aspx" class="page-title" target="_blank">IOC</a></li>
                                                <li><a href="http://financial.kaplan.co.uk/TrainingandQuals/Financialservices/IMC/Pages/default.aspx" class="page-title" target="_blank">IMC</a></li>
                                                <li><a href="http://financial.kaplan.co.uk/TrainingandQuals/Financialservices/FRM/Pages/default.aspx" class="page-title" target="_blank">FRM</a></li>
                                            </ul>
                                            <a href="http://financial.kaplan.co.uk/TrainingandQuals/Financialservices/cisicertificates/Pages/default.aspx" class="full-width-link" target="_blank">Capital Markets Programme</a>
                                            <a href="http://financial.kaplan.co.uk/TrainingandQuals/Financialservices/Excel-for-Financial-Management-and-Modelling/Pages/default.aspx" class="full-width-link" target="_blank">Excel for Financial Market Modelling</a>
                                        </div>
                                    </div>
                                    <div class="column-block right-column-block">
                                        <div class="text-promo-block staff-training">
                                            <h3 class="nav-section-heading">Are you a business looking to train your staff?</h3>
                                            <a href="/training-for-businesses/accountancy-training" class="full-width-link">Accountancy training for businesses</a>
                                            <a href="/training-for-businesses/banking-financial-services" class="full-width-link">Financial Services training for businesses</a>
                                        </div>
                                        <div class="text-promo-block">
                                            <h3 class="nav-section-heading">Legal</h3>
                                            <a href="http://www.altior.co.uk/" class="highlight" target="_blank">Go to Kaplan Altior website ›</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li role="menuitem" tabindex="-1" aria-haspopup="true">
                            <a href="/training-for-businesses/apprenticeships-and-internships" class="top-level-title page-title next-page" id="apprenticeship-nav-title">Apprenticeships &amp; Internships</a>
                            <div id="apprenticeships-nav-item" class="navbar-sub-item">
                                <h2 class="navbar-heading">Apprenticeships &amp; Internships</h2>
                                <a href="#navbar-top-level" class="navbar-back">Back <span>›</span></a>
                                <div class="nav-block">
                                    <div class="column-block solo-list no-top-border-block">
                                        <h3 class="nav-section-heading next-page">For apprentices</h3>
                                        <ul class="pages-list">
                                            <li><a href="/apprenticeships-and-internships" class="page-title">About</a></li>
                                            <li><a href="/apprenticeships-and-internships/jobs-board" class="page-title">Jobs Board</a></li>
                                            <li><a href="/apprenticeships-and-internships/apprenticeships" class="page-title">Apprenticeships</a></li>
                                            <li><a href="/apprenticeships-and-internships/internships" class="page-title">Internships</a></li>
                                            <li><a href="/apprenticeships-and-internships/talent-academy" class="page-title">Talent Academy</a></li>
                                        </ul>
                                    </div>
                                    <div class="column-block solo-list">
                                        <h3 class="nav-section-heading next-page">For employers</h3>
                                        <ul class="pages-list ">
                                            <li><a href="/training-for-businesses/apprenticeships-and-internships" class="page-title">Develop and nature talent</a></li>
                                            <li><a href="/training-for-businesses/apprenticeships-and-internships/levy-management" class="page-title">Levy management</a></li>
                                            <li><a href="/training-for-businesses/apprenticeships-and-internships" class="page-title">Hiring an apprentice</a></li>
                                            <li><a href="/training-for-businesses/apprenticeships-and-internships/apprenticeship-qualifications" class="page-title">Apprenticeship qualifications</a></li>
                                            <li><a href="/training-for-businesses/apprenticeships-and-internships/hiring-an-intern" class="page-title">Hiring an intern</a></li>
                                            <li><a href="/training-for-businesses/apprenticeships-and-internships/funding-eligibility" class="page-title">Funding and eligibility</a></li>
                                            <li><a href="/insights/apprenticeships" class="page-title">Insights</a></li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li role="menuitem" tabindex="-1" aria-haspopup="true">
                            <a href="http://kaplan-publishing.kaplan.co.uk" target="_blank" class="top-level-title page-title next-page" id="study-nav-title">Study Materials</a>
                            <div id="study-materials-nav-item" class="navbar-sub-item">
                                <h2 class="navbar-heading">Study Materials</h2>
                                <a href="#navbar-top-level" class="navbar-back">Back <span>›</span></a>
                                <div class="nav-block">
                                    <div class="column-block solo-list no-top-border-block">
                                        <h3 class="nav-section-heading next-page">By qualification</h3>
                                        <ul class="pages-list">
                                            <li><a href="http://kaplan-publishing.kaplan.co.uk/aat-aq2013/Pages/default.aspx" class="page-title" target="_blank">AAT</a></li>
                                            <li><a href="http://kaplan-publishing.kaplan.co.uk/acca-books/Pages/default.aspx" class="page-title" target="_blank">ACCA</a></li>
                                            <li><a href="http://kaplan-publishing.kaplan.co.uk/cima/Pages/default.aspx" class="page-title" target="_blank">CIMA</a></li>
                                            <li><a href="http://kaplan-publishing.kaplan.co.uk/cat-books/Pages/default.aspx" class="page-title" target="_blank">FIA</a></li>
                                        </ul>
                                    </div>
                                    <div class="column-block solo-list">
                                        <h3 class="nav-section-heading next-page">By type</h3>
                                        <ul class="pages-list">
                                            <li><a href="http://kaplan-publishing.kaplan.co.uk/study-materials/study-text/Pages/default.aspx" class="page-title" target="_blank">Study texts</a></li>
                                            <li><a href="http://kaplan-publishing.kaplan.co.uk/study-materials/exam-kits/Pages/default.aspx" class="page-title" target="_blank">Exam kits</a></li>
                                            <li><a href="http://kaplan-publishing.kaplan.co.uk/study-materials/e-learning/Pages/default.aspx" class="page-title" target="_blank">eLearning</a></li>
                                            <li><a href="http://kaplan-publishing.kaplan.co.uk/Business-books/Pages/default.aspx" class="page-title" target="_blank">Student guides</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li role="menuitem" tabindex="-1" aria-haspopup="true">
                            <a href="/insights" class="top-level-title page-title next-page" id="insights-nav-title">Insights</a>
                            <div id="insights-materials-nav-item" class="navbar-sub-item">
                                <h2 class="navbar-heading">Insights</h2>
                                <a href="#navbar-top-level" class="navbar-back">Back <span>›</span></a>
                                <!--<div class="promo-block"></div> -->
                                <div class="nav-block">
                                    <div class="column-block solo-list">
                                        <h3 class="nav-section-heading next-page">By topic</h3>
                                        <ul class="pages-list">
                                            <li><a href="/insights/leadership-professional-development" class="page-title">Leadership and professional development</a></li>
                                            <li><a href="/insights/accountancy-tax" class="page-title">Accountancy and tax</a></li>
                                            <li><a href="/insights/apprenticeships" class="page-title" target="_blank">Apprenticeships</a></li>
                                            <li><a href="/insights/kaplan-news" class="page-title">Kaplan news</a></li>
                                            <li><a href="/insights/study-tips" class="page-title">Study tips</a></li>
                                        </ul>
                                    </div>
                                    <div class="column-block solo-list">
                                        <h3 class="nav-section-heading next-page">By type</h3>
                                        <ul class="pages-list">
                                            <li><a href="/insights/articles" class="page-title">Articles</a></li>
                                            <li><a href="/insights/infographics" class="page-title">Infographics</a></li>
                                            <li><a href="/insights/webinars" class="page-title">Webinars</a></li>
                                            <li><a href="/insights/whitepapers" class="page-title">Whitepapers</a></li>
                                            <li><a href="/insights/videos" class="page-title">Videos</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li role="menuitem" tabindex="-1" aria-haspopup="true">
                            <a href="/about-us" class="top-level-title page-title next-page" id="about-nav-title">About Kaplan</a>
                            <div id="about-nav-item" class="navbar-sub-item">
                                <h2 class="navbar-heading">About Kaplan</h2>
                                <a href="#navbar-top-level" class="navbar-back">Back <span>›</span></a>
                                <div class="nav-block">
                                    <ul class="pages-list">
                                        <li><a href="http://financial.kaplan.co.uk/AboutKaplan/OurLocations/Pages/default.aspx" class="page-title" target="_blank">Training locations</a></li>
                                        <li><a href="/about-us/careers/current-vacancies" class="page-title">Careers</a></li>
                                        <li><a href="/insights/kaplan-news" class="page-title">Company news</a></li>
                                        <li><a href="/about-us/request-callback" class="page-title">Contact us</a></li>
                                        <li><a href="/corporate-social-responsibility" class="page-title">Corporate social responsibility</a></li>
                                        <li><a href="/meet-the-experts">Meet the experts</a></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li class="mobile-only-item"><a href="https://mykaplan.co.uk/" target="_blank" class="page-title">MyKaplan</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</div>



<!-- Mobile Navigation -->

<div class="container mobile-nav-container">
    <!-- Push Wrapper -->
        <!-- mp-menu -->
        <nav id="mp-menu" class="mp-menu">
            <a href="#" id="close-menu">close</a>
            <div class="mp-level">
                <h2>Home</h2>
                <ul>
                    <li class="icon icon-arrow-left">
                        <a href="#">Leadership &amp; Professional Development</a>
                        <div class="mp-level">
                            <h2>Leadership &amp; Professional Development</h2>
                            <a class="mp-back" href="#">back <span>›</span></a>
                            <ul>
                                <li class="icon icon-arrow-right"><a href="#">Overview</a></li>
                                <li class="icon icon-arrow-right"><a href="#">Our approach</a></li>
                                <li class="icon icon-arrow-right"><a href="#">Technical competence</a></li>
                                <li class="icon icon-arrow-right"><a href="#">Behavioural confidence</a></li>
                                <li class="icon icon-arrow-right"><a href="#">Our team</a></li>
                                <li class="icon icon-arrow-right"><a href="#">Success stories</a></li>
                                <li class="icon icon-arrow-right"><a href="#">Global reach</a></li>
                                <li class="icon icon-arrow-right"><a href="#">Diagnostics</a></li>
                                <li class="icon icon-arrow-right"><a href="#">Insights</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="icon icon-arrow-left">
                        <a href="#">Professional Qualifications</a>
                        <div class="mp-level">
                            <h2>Professional Qualifications</h2>
                            <a class="mp-back" href="#">back <span>›</span></a>
                            <ul>
                                <li class="icon icon-arrow-left">
                                    <a href="#">Accountancy and Tax</a>
                                    <div class="mp-level">
                                        <h2>Accountancy and Tax</h2>
                                        <a class="mp-back" href="#">back <span>›</span></a>
                                        <ul>
                                            <li><a href="#">AAT</a></li>
                                            <li><a href="#">ACCA</a></li>
                                            <li><a href="#">ACA(ICAEW)</a></li>
                                            <li><a href="#">ATT</a></li>
                                            <li><a href="#">CIMA</a></li>
                                            <li><a href="#">CFAB(ICAEW)</a></li>
                                            <li><a href="#">Bookkeeping</a></li>
                                            <li><a href="#">CIPFA</a></li>
                                            <li><a href="#">ICB</a></li>
                                            <li><a href="#">FIA</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li class="icon icon-arrow-left">
                                    <a href="#">Banking and Financial Services</a>
                                    <div class="mp-level">
                                        <h2>Banking and Financial Services</h2>
                                        <a class="mp-back" href="#">back <span>›</span></a>
                                        <ul>
                                            <li><a href="#">CAIA</a></li>
                                            <li><a href="#">CeMAP</a></li>
                                            <li><a href="#">CFA</a></li>
                                            <li><a href="#">IOC</a></li>
                                            <li><a href="#">IMC</a></li>
                                            <li><a href="#">FRM</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li><a href="#">Are you a business looking to train your staff?</a></li>
                                <li><a href="#">Accountancy training for businesses</a></li>
                                <li><a href="#">Financial Sercices training for business</a></li>
                                <li><a href="#">Legal</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="icon icon-arrow-left">
                        <a href="#">Apprenticeships &amp; Internships</a>
                        <div class="mp-level">
                            <h2>Apprenticeships &amp; Internships</h2>
                            <a class="mp-back" href="#">back <span>›</span></a>
                            <ul>
                                <li><strong class="nav-heading">For apprentices</strong></li>
                                <li><a href="#">About</a></li>
                                <li><a href="#">Job Board</a></li>
                                <li><a href="#">Apprenticeships</a></li>
                                <li><a href="#">Internships</a></li>
                                <li><a href="#">Talent Academy</a></li>
                                <li><strong class="nav-heading">For Employers</strong></li>
                                <li><a href="#">Hiring an apprentice</a></li>
                                <li><a href="#">Apprenticeship qualifications</a></li>
                                <li><a href="#">Hiring an intern</a></li>
                                <li><a href="#">Funding and eligibility</a></li>
                                <li><a href="#">Insights</a></li>
                            </ul>
                        </div>
                    </li>
                    <li class="icon icon-arrow-left">
                        <a href="#">Study Materials</a>
                        <div class="mp-level">
                            <h2>Study Materials</h2>
                            <a class="mp-back" href="#">back <span>›</span></a>
                            <ul>
                                <li><strong class="nav-heading">By qualification</strong></li>
                                <li><a href="#">AAT</a></li>
                                <li><a href="#">ACCA</a></li>
                                <li><a href="#">CIMA</a></li>
                                <li><a href="#">FIA</a></li>
                                <li><strong class="nav-heading">By type</strong></li>
                                <li><a href="#">Study texts</a></li>
                                <li><a href="#">Exam kits</a></li>
                                <li><a href="#">eLearning</a></li>
                                <li><a href="#">Student guides</a></li>
                            </ul>
                        </div>
                    </li>
                    <li><a href="#">Insights</a></li>
                    <li class="icon icon-arrow-left">
                        <a href="#">About Kaplan</a>
                        <div class="mp-level">
                            <h2>About Kaplan</h2>
                            <a class="mp-back" href="#">back <span>›</span></a>
                            <ul>
                                <li><a href="#">Training locations</a></li>
                                <li><a href="#">Careers</a></li>
                                <li><a href="#">Company news</a></li>
                                <li><a href="#">Contact us</a></li>
                            </ul>
                        </div>
                    </li>
                    <li><a href="#">MyKaplan</a></li>
                </ul>
            </div>
        </nav>
        <!-- /mp-menu -->

</div>
<!-- /container -->

<!-- End Mobile Navigation -->
