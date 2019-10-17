// TODO:
// - check on mobile


if (!String.prototype.format) {
    String.prototype.format = function() {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined'
          ? args[number]
          : match
        ;
      });
    };
  }
  
  

  //=====================
  
  
  var LEFT_MARGIN = 50,
      TOP_MARGIN = 50,
      CONVO_OFFSET = 150,
  
      FRACTION_WIDTH = 10,
  
      SHADOW_K = .1,
  
      SCALE_Y = 1,
  
      L_ALL_STATES = 'All States',
      L_CONVO = 'election',
      L_STATE_OF_CONVO = 'States {0} election',
      L_STATE = '{0} States.'
  
      ENGLISH = false;
  
  
  var dom = {
      svg: undefined,
      elections: undefined,
      fractions: undefined,
      transitions: undefined,
      defs: undefined,
      deputies: undefined,
      header: undefined,
  }
  
  var s = {}
  
  //=====================
  
  function setTitle(name) {
      var counter = L_STATE.format(dom.states.selectAll('.state:not(.hidden)').size());
  
      dom.header.select('#title').html(name === undefined ? L_ALL_STATES : name);
      dom.header.select('#supp').text(counter);
      //dom.header.select('#counter').text(supp === undefined ? '' : counter);
      dom.header.select('#clear').classed('hidden', name === undefined);
  }
  
  function hoverelection(election) {
      s.fractions
          .classed('active', function(d) { return election !== undefined && d.electionId == election.id; });
      s.transitions
          .classed('active', false);
  }
  
  function hoverFraction(fraction) {
      s.fractions
          .classed('active', function(d) { return fraction !== undefined && d.id == fraction.id; });
  }
  
  function hoverTransition(transition) {
      s.transitions
          .classed('active', function(d) { return transition !== undefined && d.id == transition.id; });
  
      s.fractions
          .classed('active', function (d) {
              return transition !== undefined && (d.id == transition.from || d.id == transition.to);
          });
  }
  
  function hoverstate(state) {
      s.fractions
          .classed('active', function(d) {
              return state !== undefined && state.fractionIds.indexOf(d.id) != -1;
          })
          .classed('faded', function(d) {
              if (state !== undefined)
                  return state.fractionIds.indexOf(d.id) == -1;
              else
                  if (noSelection)
                      return false
                  else
                      return !d3.select(this).classed('selected');
              });
  
      s.transitions
          .classed('active', function(d) {
              if (state === undefined)
                  return false;
              var i = state.fractionIds.indexOf(d.from);
              return i != -1 && state.fractionIds.indexOf(d.to) == i + 1;
          })
          .classed('faded', function(d) {
              if (state !== undefined) {
                  var i = state.fractionIds.indexOf(d.from);
                  return i == -1 || state.fractionIds.indexOf(d.to) != i + 1;
              }
              else
                  if (noSelection)
                      return false;
                  else
                      return !d3.select(this).classed('selected');
          });
  }
  
  var noSelection = true;
  function clearSelection() {
      if (!noSelection) {
          noSelection = true;
  
          s.fractions
              .classed('selected', false)
              .classed('faded', false);
          s.transitions
              .classed('selected', false)
              .classed('faded', false);
          s.states.classed('hidden', false);
      }
  }
  
  function selectFraction(fraction) {
      noSelection = false;
  
      s.fractions
          .classed('selected', function(d) { return d.id == fraction.datum().id; })
          .classed('faded', function(d) { return d.id != fraction.datum().id; });
  
      s.transitions
          .classed('faded', true)
          .classed('selected', false);
  
  
      s.states
          .classed('hidden', function(d) { return d.fractionIds.indexOf(fraction.datum().id) == -1; });
  
  
      setTitle(
          '{0}, {1}&nbsp;{2}'.format(
              fraction.datum()._name,
              d_elections[fraction.datum().electionId].title,
              L_CONVO
          )
      );
  }
  
  function selectTransition(transition) {
      noSelection = false;
  
      s.fractions
          .classed('faded', function(d) { return d.id != transition.datum().from && d.id != transition.datum().to; })
          .classed('selected', function(d) { return d.id == transition.datum().from || d.id == transition.datum().to; });
  
      s.transitions
          .classed('faded', function(d) { return d.id != transition.datum().id; })
          .classed('selected', function(d) { return d.id == transition.datum().id; });
  
      s.states
          .classed('hidden', function(d) {
              var i = d.fractionIds.indexOf(transition.datum().from)
              return i == -1 || d.fractionIds.indexOf(transition.datum().to) != i + 1;
          });
  
  
      var title = d_fractions[transition.datum().from].partyId == d_fractions[transition.datum().to].partyId ?
          '{0}, {1}&nbsp;→&nbsp;{2}&nbsp;{3}'.format(
              d_fractions[transition.datum().from]._name,
              d_fractions[transition.datum().from]._convoName,
              d_fractions[transition.datum().to]._convoName,
              L_CONVO
          ) :
          '{0},&nbsp;{1} → {2},&nbsp;{3}'.format(
              d_fractions[transition.datum().from]._name,
              d_fractions[transition.datum().from]._convoName,
              d_fractions[transition.datum().to]._name,
              d_fractions[transition.datum().to]._convoName
          );
  
      setTitle(
          title,
          '{0} → {1}'.format(d_fractions[transition.datum().from]._convoName, d_fractions[transition.datum().to]._convoName)
      );
  }
  
  function selectelection(convo) {
      noSelection = false;
  
      s.fractions
          .classed('selected', function(d) { return d.electionId == convo.datum().id; })
          .classed('faded', function(d) { return d.electionId != convo.datum().id; });
  
      s.transitions
          .classed('faded', true)
          .classed('selected', false);
  
      s.states
          .classed('hidden', function(d) { return d.elections[convo.datum().id - 1].partyId === undefined; });
  
      setTitle(
          L_STATE_OF_CONVO.format(convo.datum().title)
      );
  }
  
  //=====================
  
  
  function fractionPosition(fraction) {
      return [
          (LEFT_MARGIN + (d_elections[fraction.electionId].id - 1) * CONVO_OFFSET),
          SCALE_Y * (fraction.offset + fraction.order * 3) + TOP_MARGIN
      ]
  }
  
  
  function drawelections() {
      var elections = dom.elections.selectAll('.election').data(a_elections).enter();
  
      var groups = elections.append('g')
          .classed('election', true)
          .attr('transform', function(d) { return 'translate({0},{1})'.format(LEFT_MARGIN + (d.id - 1) * CONVO_OFFSET, TOP_MARGIN); });
  
      var labels = groups.append('g')
          .classed('electionLabel', true)
          .attr('transform', 'translate(0,-20)')
          .on('mouseover', hoverelection)
          .on('mouseout', function(d) { hoverelection(); })
          .on('click', function(d) {
              event.stopPropagation();
              selectelection(d3.select(this.parentNode));
          });
  
      labels.append('text')
          .classed('electionYears', true)
          .text(function(d) { return d.years; });
  
      labels.append('text')
          .classed('electionNumber', true)
          .attr('y', -15)
          .text(function(d) { return d.title; });
  }
  
  function drawTransitions() {
      var transitionsDirect = dom.transitionsDirect.selectAll('.transition').data(a_transitions_direct).enter();
      var transitionsJump = dom.transitionsJump.selectAll('.transition').data(a_transitions_jump).enter();
  
      var transitionsHover = dom.transitionsHover.selectAll('.transition').data(a_transitions_jump.concat(a_transitions_direct)).enter();
  
      var grads = dom.defs.selectAll('linearGradient')
          .data(a_transitions_direct.concat(a_transitions_jump), function(d) { return d.from + '-' + d.to })
          .enter()
              .append('linearGradient')
              .attr('id', function(d) { return 'g' + d.from + '-' + d.to; })
              .attr('x1', 0)
              .attr('y1', 0)
              .attr('x2', 1)
              .attr('y2', 0);
  
      grads.append('stop')
          .attr('offset', '0%')
          .attr('stop-color', function(d) { return d_fractions[d.from]._color; });
  
      grads.append('stop')
          .attr('offset', '100%')
          .attr('stop-color', function(d) { return d_fractions[d.to]._color; });
  
      function drawHelper(transitions, forHover) {
          var groups = transitions.append('g')
              .classed('transition', true);
  
          if (forHover !== undefined)
              groups
                  .on('mouseover', hoverTransition)
                  .on('mouseout', function(d) { hoverTransition(); })
                  .on('click', function(d) {
                      event.stopPropagation();
                      selectTransition(d3.select(this));
                  });
  
          var lines1 = groups.filter(function(d) {
              return d_fractions[d.from]._position[1] + d.leftOffset * SCALE_Y == d_fractions[d.to]._position[1] + d.rightOffset * SCALE_Y;
          })
  
          lines1.append('rect')
              .attr('x', function(d) { return d_fractions[d.from]._position[0] + FRACTION_WIDTH / 2; })
              .attr('y', function(d) { return d_fractions[d.from]._position[1] + d.leftOffset * SCALE_Y; })
              .attr('width', function(d) { return d_fractions[d.to]._position[0] - d_fractions[d.from]._position[0] - FRACTION_WIDTH; })
              .attr('height', function(d) { return d.number * SCALE_Y; })
              .attr('stroke', 'none')
              .attr('fill', function(d) {
                  if (forHover === undefined)
                      return 'url(#g{0}-{1})'.format(d.from, d.to);
                  else
                      return 'rgba(0, 0, 0, 0)';
              });
  
          var lines2 = groups.filter(function(d) {
              return d_fractions[d.from]._position[1] + d.leftOffset != d_fractions[d.to]._position[1] + d.rightOffset;
          })
  
          lines2.append('path')
              .attr('d', function(d) {
                  var f1 = d_fractions[d.from],
                      f2 = d_fractions[d.to];
                  var result = 'M {0} {1} C {2} {3}, {4} {5}, {6} {7}'.format(
                      f1._position[0] + FRACTION_WIDTH / 2, f1._position[1] + (d.leftOffset + d.number / 2) * SCALE_Y,
                      (f1._position[0] + f2._position[0]) / 2, f1._position[1] + (d.leftOffset + d.number / 2) * SCALE_Y,
                      (f1._position[0] + f2._position[0]) / 2, f2._position[1] + (d.rightOffset + d.number / 2) * SCALE_Y,
                      f2._position[0] - FRACTION_WIDTH / 2, f2._position[1] + (d.rightOffset + d.number / 2) * SCALE_Y
                  );
  
                  return result;
              })
              .attr('fill', 'none')
              .attr('stroke', function(d) {
                  if (forHover === undefined)
                      return 'url(#g{0}-{1})'.format(d.from, d.to);
                  else
                      return 'rgba(0, 0, 0, 0)';
              })
              .attr('stroke-width', function(d) {
                  if (forHover === undefined || d.number > 5)
                      return d.number * SCALE_Y;
                  else
                      return 6;
              });
      }
  
      drawHelper(transitionsDirect);
      drawHelper(transitionsJump);
      drawHelper(transitionsHover, true);
  
      s.transitions = dom.drawArea.selectAll('.transition');
  }
  
  function drawFractions() {
      var fractions = dom.fractions.selectAll('.fraction').data(a_fractions).enter();
      var fractionsHover = dom.fractionsHover.selectAll('.fraction').data(a_fractions).enter();
  
  
      var groups = fractions.append('g')
          .classed('fraction', true)
          .attr('transform', function(d) {
              d._position = fractionPosition(d);
              d._color = d_parties[d.partyId].color;
              d._name = d_parties[d.partyId].name;
              d._convoName = d_elections[d.electionId].number;
              return 'translate({0},{1})'.format(d._position[0], d._position[1]);
          });
  
      var hoverGroups = fractionsHover.append('g')
          .classed('fraction', true)
          .attr('transform', function(d) {
              return 'translate({0},{1})'.format(d._position[0], d._position[1]);
          })
          .on('mouseover', hoverFraction)
          .on('mouseout', function() { hoverFraction(); })
          .on('click', function() {
              event.stopPropagation();
              selectFraction(d3.select(this));
          });
  
      groups.append('rect')
          .attr('x', -FRACTION_WIDTH / 2)
          .attr('y', 0)
          .attr('width', FRACTION_WIDTH)
          .attr('height', function(d) { return d.size * SCALE_Y; })
          .attr('fill', function(d) { return d._color; });
  
      hoverGroups.append('rect')
          .attr('x', -FRACTION_WIDTH / 2)
          .attr('y', function(d) {
              if (d.size < 5)
                  return -(5 - d.size) / 2 * SCALE_Y;
              else
                  return 0;
          })
          .attr('width', FRACTION_WIDTH)
          .attr('height', function(d) {
              if (d.size < 5)
                  return 5 * SCALE_Y;
              else
                  return d.size * SCALE_Y;
          })
          .attr('fill', 'rgba(0, 0, 0, 0)');
  
  
      var labels = groups.append('g')
          .classed('fractionLabel', true)
          .attr('transform', function(d) {
              var y = 0;
              var x = d.electionId == 10 ? -16 : 10;
              var toShift = {

              }
  
              if (toShift[d.id] !== undefined) y = toShift[d.id]
  
              return 'translate({0}, {1})'.format(x, y + 2);
          })
          .attr('text-anchor', function(d) {
              return d.electionId == 10 ? 'end' : 'start';
          });
  
      labels.append('rect')
          .attr('y', 0)
          .attr('height', 16);
  
      labels.append('text')
          .text(function(d) { return d._name; })
          .attr('x', 3)
          .attr('y', 12);
  
      labels.each(function(d) {
          var bbox = d3.select(this).select('text').node().getBBox();
          d3.select(this).select('rect').attr('x', bbox.x -3 );
          d3.select(this).select('rect').attr('width', bbox.width + 6);
      })
  
      s.fractions = dom.fractions.selectAll('.fraction');
  }
  
  function addStates() {
      var deputies = dom.states.selectAll('.state').data(a_states).enter().append('div');
  
      deputies
          .classed('state', true)
          .attr('title', function(d) { return d.name; })
          .on('mouseover', function(d) { hoverstate(d); })
          .on('mouseout', function(d) { hoverstate(); })
          .on('click', function(d) { event.stopPropagation(); })
          .append('div')
              .classed('stateName', true)
              .text(function(d) {
                  var fio = d.name.split(' ');
                  return d.name;
              });
  
      var convos = deputies
          .append('div')
          .classed('depConvos', true)
          .selectAll('depConvo').data(function(d) { return d.elections; }).enter();
  
      convos.append('div')
          .classed('depConvo', true)
          .classed('empty', function(d) { return d.partyId === undefined; })
          .style('background-color', function(d) {
              if (d.partyId !== undefined)
                  return d_parties[d.partyId].color;
              else
                  return 'none';
          })
  
      s.states = dom.states.selectAll('.state');
  }
  
  function scrollEvents() {
      d3.select(document).on('scroll', function() {
          dom.header.classed('scroll', document.body.scrollTop > 0);
      });
  }
  
  
  function draw(eng) {
      if (eng !== undefined) {
          ENGLISH = true;
  
          L_ALL_STATES = 'All States';
          L_CONVO = 'election';
          L_STATE_OF_CONVO = 'States, {0} election';
          L_STATE = '{0} Voting Blocks.'
      }
  
      if (window.innerHeight < 575 + 85 + 25) {
          SCALE_Y = (575 - TOP_MARGIN - (575 + 85 + 25 - window.innerHeight)) / (575 - TOP_MARGIN);
      }
  
      if (window.innerWidth < 1000 + 210 + 20) {
          CONVO_OFFSET = (1000 - (1000 + 210 + 20 - window.innerWidth) - 2 * LEFT_MARGIN) / 6;
      }
  
      dom.svg = d3.select('#diagram svg');
      dom.elections = dom.svg.select('.elections');
      dom.fractions = dom.svg.select('.fractions');
      dom.transitionsDirect = dom.svg.select('.transitions .direct');
      dom.transitionsJump = dom.svg.select('.transitions .jump');
      dom.defs = dom.svg.select('defs');
      dom.states = d3.select('.states');
      dom.header = d3.select('#listHeader');
      dom.transitionsHover = d3.select('.hoverTransitions');
      dom.fractionsHover = d3.select('.hoverFractions');
      dom.drawArea = d3.select('svg .drawings');
  
      drawelections();
      drawFractions();
      drawTransitions();
      addStates();
  
      setTitle();
  
      scrollEvents();
  
      d3.select(window).on('click', function() {
          clearSelection();
          setTitle();
      });
  }