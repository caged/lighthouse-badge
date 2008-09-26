if((typeof Lighthouse != 'undefined') && (typeof jQuery != 'undefined')) {
  Lighthouse.Badge = function() {
    return this.initialize.apply(this, arguments);
  };

  Lighthouse.Badge.VERSION = "0.2.0";
  Lighthouse.Badge.prototype = {
    initialize: function() {
      this.baseURL = 'http://' + Lighthouse.account + '.lighthouseapp.com/';
      var self = this;
      $.getJSON(this.resourceURL('tokens', Lighthouse.token),
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
                       '">' + obj.ticket.title + '</a></li>');
          link.appendTo(ticketList)
        });
        ticketList.appendTo(container);
      });
    },
    
    resourceURL: function(resource, obj) {
      return this.baseURL + resource + '/' + obj + '.json?_token=' + 
      Lighthouse.token + '&callback=?';
    },
       
    ticketsURL: function(project) {
      return this.baseURL + 'projects/' +  
             project + '/tickets.json?q=' + Lighthouse.query + 
            '&_token=' + Lighthouse.token + '&callback=?';
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
  alert("You need to define Lighthouse.token, Lighthouse.account and Lighthouse.query and have jQuery present");
}