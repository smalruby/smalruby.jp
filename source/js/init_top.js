	// jQuery
		jQuery(function() {

			var $window = $(window),
				$body = $('body'),
				$header = $('#header'),
				$all = $body.add($header),
				sectionTransitionState = false;

			// Disable animations/transitions until everything's loaded
				$all
					.addClass('loading')
					.fadeTo(0, 0.0001);
				
				$window.load(function() {
					window.setTimeout(function() {
						$all
							.fadeTo(_settings.fadeInSpeed, 1, function() {
								$body.removeClass('loading');
								$all.fadeTo(0, 1);
							});
					}, _settings.fadeInSpeed);
				});
				
			// Settings overrides
			
				// IE <= 9?
					if (skel.vars.IEVersion <= 9)
						_settings.useSectionTransitions = false;
			
				// Touch?
					if (skel.vars.isTouch) {
					
						// Disable section transitions
							_settings.useSectionTransitions = false;
							
						// Turn on touch mode
							$body.addClass('touch');
					
					}
					
				// Mobile?
					if (skel.isActive('mobile')) {
					
						// Reduce poptrox windowMargin
							_settings.poptrox.windowMargin = 5;
					
					}

			// Forms
				if (skel.vars.IEVersion < 10)
					$('form').formerize();

			// Gallery
				$('.gallery').poptrox(_settings.poptrox);

			// Events
			
				// State change (skel)
					skel.onStateChange(function() {

						// Force touch mode if we're in mobile
							if (skel.isActive('mobile'))
								$body.addClass('touch');
							else if (!skel.vars.isTouch)
								$body.removeClass('touch');
					
						// Section transitions
							if (_settings.useSectionTransitions) {
							
								if (!skel.isActive('mobile')) {
									
									if (!sectionTransitionState) {
									
										sectionTransitionState = true;
										
										// Generic sections
											$('.main.style1')
												.scrollwatch({
													delay:		50,
													range:		0.25,
													anchor:		'center',
													init:		function(t) { t.addClass('inactive'); },
													on:			function(t) { t.removeClass('inactive'); },
													off:		function(t) { t.addClass('inactive'); }
												});

											$('.main.style2')
												.scrollwatch({
													delay:		50,
													range:		0.5,
													anchor:		'center',
													init:		function(t) { t.addClass('inactive'); },
													on:			function(t) { t.removeClass('inactive'); },
													off:		function(t) { t.addClass('inactive'); }
												});
									
										// Work
											$('#work')
												.scrollwatch({
													delay:		25,
													range:		0.6,
													anchor:		'center',
													init:		function(t) { t.find('.row.images').addClass('inactive'); },
													on:			function(t) {
																	var	rows = t.find('.row.images'),
																		length = rows.length,
																		n = 0;
																	
																	rows.each(function() {
																		var row = $(this);
																		window.setTimeout(function() {
																			row.removeClass('inactive');
																		}, 100 * (length - n++));
																	});
																},
													off:		function(t) {
																	var	rows = t.find('.row.images'),
																		length = rows.length,
																		n = 0;
																	
																	rows.each(function() {
																		var row = $(this);
																		window.setTimeout(function() {
																			row.addClass('inactive');
																		}, 100 * (length - n++));
																	});
																}
												});

										// Contact
											$('#contact')
												.scrollwatch({
													delay:		25,
													range:		0.5,
													anchor:		'center',
													init:		function(t) { t.addClass('inactive'); },
													on:			function(t) { t.removeClass('inactive'); },
													off:		function(t) { t.addClass('inactive'); }
												});

										// Force scroll event
											window.setTimeout(function() {
												$window
													.trigger('resize')
													.trigger('scroll');
											}, 0);
												
									}

								}
								else {

									sectionTransitionState = false;

									// Generic sections
										$('.main.style1')
											.unscrollwatch()
											.removeClass('inactive');
										
										$('.main.style2')
											.unscrollwatch()
											.removeClass('inactive');
								
									// Work
										$('#work')
											.unscrollwatch()
											.find('.row.images').removeClass('inactive');

									// Contact
										$('#contact')
											.unscrollwatch()
											.removeClass('inactive');
								
								}

							}
						
					});

				// Resize
					$window.resize(function() {

						// Disable animations/transitions
							$body.addClass('loading');

						window.setTimeout(function() {

							// Update scrolly links
								$('a[href^=#]').scrolly(1500, $header.outerHeight() - 1);

							// Resize fullscreen elements
								if (_settings.useFullScreen
								&&	!skel.isActive('mobile')) {
									$('.fullscreen').each(function() {
									
										var $t = $(this),
											$c = $t.children('.content'),
											x = Math.max(100, Math.round(($window.height() - $c.outerHeight() - $header.outerHeight()) / 2) + 1);

										$t
											.css('padding-top', x)
											.css('padding-bottom', x);
									
									});
								}
								else
									$('.fullscreen')
										.css('padding-top', '')
										.css('padding-bottom', '');
								
								
							// Re-enable animations/transitions
								window.setTimeout(function() {
									$body.removeClass('loading');
									$window.trigger('scroll');
								}, 1000);

						}, 100);
					
					});
					
			// Trigger events on load
				$window.load(function() {
					$window
						.trigger('resize')
						.trigger('scroll');
				});

		});
