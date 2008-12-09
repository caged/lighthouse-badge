// This is basically a GitHub specific version for now.
//
if(typeof jQuery != 'undefined') {
  var Lighthouse = {};
  Lighthouse.Badge = function() {
    return this.initialize.apply(this, arguments);
  };

  Lighthouse.Badge.VERSION = "0.2.0";
  Lighthouse.Badge.prototype = {
    initialize: function() {
      var params = $('#lighthouse-parameters');
      if(!params) {
        alert("You need to define a span element with the id of lighthouse-parameters and define the required params");
        return;
      }
      
      this.account = params.attr('account');
      this.query   = params.attr('query');
      this.token   = params.text();
      this.baseURL = 'http://' + this.account + '.lighthouseapp.com/';
      
      var self = this;
      $.getJSON(this.resourceURL('tokens', this.token),
        function(data) {
          if(!data.token.read_only) {
            alert("This token has write access.  You should use a read only token.");
            return;
          }
          self.getTickets(data.token.project_id);
        });
    },
    
    getTickets: function(project) {
      var container = $(this.scriptTag().parentNode), self = this;
      $.getJSON(this.ticketsURL(project), function(data) {
        var ticketList = $('<ul class="lh-tickets">');
        $.each(data.tickets, function(index, obj) {
          var link = $('<li><a href="' + self.baseURL + 'projects/' + project + 
                       '/tickets/' + obj.ticket.number + '-' + obj.ticket.permalink + 
                       '"><strong>#' + obj.ticket.number + '</strong> ' + 
                       obj.ticket.title + '</a></li>');
          link.appendTo(ticketList);
        });
        ticketList.appendTo(container);
      });
    },
    
    resourceURL: function(resource, obj) {
      var url = this.baseURL + resource + '/' + obj + '.json?_token=' + 
      this.token + '&callback=?';
      return url;
    },
       
    ticketsURL: function(project) {
      return this.baseURL + 'projects/' +  
             project + '/tickets.json?q=' + this.query + 
            '&_token=' + this.token + '&callback=?';
    },
    
    scriptTag: function() {
      return $.grep($('body script'), function(tag) {
        var src = $(tag).attr('src');
        if(src) 
          return src.match(/lighthouse\-badge\.js/);
      })[0];
    }
  };

  // Initialize everything
  $(function() { new Lighthouse.Badge(); });
} else {
  alert("You need to have jQuery present");
}