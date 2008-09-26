## Add Lighthouse Tickets To Your GitHub Wiki

### Create a READONLY API token in Lighthouse
[Log into your profile on Lighthouse](https://sera.lighthouseapp.com/login).  In the sidebar, 
choose the account and project you're wanting to show.  It's important that this is a *READ ONLY* 
key and the project is OSS or public because anyone can see your key.

### Add the code to your GitHub wiki
Add the code below to the wiki page you want to show Lighthouse tickets on.
Because GitHub sanitizes inline scripts, you'll need to specify your account, token and a 
custom query if you'd like on a span element with the id lighthouse-parameters.

  <notextile>
  <style type="text/css">
  ul.lh-tickets {
    list-style:none;
  }

  ul.lh-tickets li {
    display:block;
    padding:6px 0 !important;
    border-bottom: 1px solid #eee;
  }

  ul.lh-tickets a {
    position:relative;
  }
  ul.lh-tickets a:hover {


  }

  ul.lh-tickets a strong {
    color:#555 !important;
    font-weight:bold;
    width:42px;
    float:left;
  }
  </style>
  </notextile>
  
<span style="display:none" id="lighthouse-parameters"  account="activereload" query="state:open">13680c7b2c869868cfd87963df8e8252202d9a0d</span>
<script src="http://github.com/Caged/lighthouse-badge/tree/master%2Fsrc%2Flighthouse-badge.js?raw=true"></script>