		var data = [];
		var graphs=null;
		var graphContainer=$('#GraphContainer');
		var current_config= {
													spline: {
														lineWidth: 4,
														states: {
															hover: {
																	lineWidth: 5
															}
														},
														marker: {
															enabled: false
														}
													}
												};
		var process_input = function process_input(input) {
				var info;
				
				info = (input);
				console.log(info);

				if ('config' in info) {
						process_config(info.config);
				}

				if ('data' in info) {
						process_new_data(info.data);
				}
		};

		var process_config = function process_config(new_config) {
			console.log('New config');
		};

		var process_new_data = function process_new_data(new_data) {

			graphs=[];
			for (var identiti in new_data) {
				for(var magnitude in new_data[identiti].data){
					if (graphs[magnitude]==undefined){
						graphs[magnitude]=[];/*New Array*/
					}
					graphs[magnitude].push({name:identiti ,data:new_data[identiti].data[magnitude]});
				}
			}
			/*Set to datetime*/
			for (var magnitude in graphs){
 				for (var graph=0 ; graph<graphs[magnitude].length; graph++){
					for (var sample=0 ; sample<graphs[magnitude][graph].data.length; sample++){
						graphs[magnitude][graph].data[sample][0]=new Date(graphs[magnitude][graph].data[sample][0]);
					}
				}
 			}
			draw_graphs();
		};

		var draw_graphs = function draw_graphs() {
			var i=0;
			for (var graph in graphs){
				$('#GraphContainer').append('<div id=gr'+i+'/>');
				$('#gr'+i).highcharts({
					chart: {
							type: 'spline',
							zoomType: 'x'
					},
					xAxis: {
							type: 'datetime'
					},
					title: {
							text: graph
					},
					plotOptions: current_config,
					series:graphs[graph]
				});
				i++;
			}
		};
		// Input handler
		MashupPlatform.wiring.registerCallback('input', process_input);