$(document).ready(function(){

	var Body = {

		WeatherView: {

			API: function(){
			
				var x;
				
				$.ajax({
				
					async: false,
					
					url: 'http://api.openweathermap.org/data/2.5/weather?q=' + Locale,
					
					success: function(data){

						x = data;

					},
					
				});
				
				return x;
			},

			Icon: {
		
				Main: function(){
				
					var x = Body.WeatherView.API().weather[0].icon;
					
					var y = '<img src="../Images/' + x + '.png" />';
					
					return y;
				
				},
				
				Wait: '<img src="../Images/Wait.gif" />',
				
			},

			Degrees: function (){
			
				k = Body.WeatherView.API().main.temp;
				
				c = Math.round(k - 273.15);
				
				f = Math.round(k * 9 / 5 - 459.67);
				
				if (Scale == 'c') {
				
					return c;
				
				} else if (Scale == 'f') {
				
					return f;
				
				} else {
				
					return k;
				
				};

			},

		},

		ChronoView: {

			Time: {
			
				Minute: function(){
				
					var x = new Date().getMinutes();
					
					if (x < 10) {
					
					  var y = '0' + x;
					  
					} else {
					
					  var y = x;
					  
					};
					
					return y;
			
				},
		
				Hour: function(){
				
					var x = new Date().getHours();
						
					if (x > 12) {
						
						x -= 12;
					
					} else if (x == 0) {
					
						x = 12;
					
					};
					
					return x;
				
				},

				isAM: function(){

					if (new Date().getHours() < 12) {

						return true;

					} else {

						return false;

					};

				},
				
			},
	
			Date: {
			
				Year: new Date().getFullYear(),
				
				NumericalDay: new Date().getDate(),
				
				Month: function(){
					
					var x = new Date().getMonth();
					
					var y = [

						'January',
						'February',
						'March',
						'April',
						'May',
						'June',
						'July',
						'August',
						'September',
						'October',
						'November',
						'December',

					];
					
					return y[x];
				
				},
				
				PlanetaryDay: function(){
					
					var x = new Date().getDay();
					
					var y = [

						'Sunday',
						'Monday',
						'Tuesday',
						'Wednesday',
						'Thursday',
						'Friday',
						'Saturday',

					];
					
					return y[x];
				
				},
	  
			},

			Period: function(){
				
				var x = '<ChronoViewPeriodAM>' + 'AM' + '</ChronoViewPeriodAM>';

				var y = '<ChronoViewPeriodPM>' + 'PM' + '</ChronoViewPeriodPM>';

				return x + y;

			},

		},

		CalendarView: {

			Days: [

				'SUN',
				'MON',
				'TUE',
				'WED',
				'THU',
				'FRI',
				'SAT',

			],

		},

	};

	(function UpdateChronoView(){
	
		var x = '<ChronoViewTime>' + Body.ChronoView.Time.Hour() +  ':' + Body.ChronoView.Time.Minute() + '</ChronoViewTime>';
		
		var y = '<ChronoViewDate>' + Body.ChronoView.Date.PlanetaryDay() + ', ' + Body.ChronoView.Date.Month() + ' ' + Body.ChronoView.Date.NumericalDay + '</ChronoViewDate>';
	
		var z = '<ChronoViewPeriod>' + Body.ChronoView.Period() + '</ChronoViewPeriod>';

		setTimeout(function(){
		
			$('ChronoView').html(x + y + z);

			if (Body.ChronoView.Time.isAM()) {

				$('ChronoViewPeriodAM').addClass('current');

			} else {

				$('ChronoViewPeriodPM').addClass('current');

			};
			
		}, 0);
		
		setTimeout(UpdateChronoView, 1000 * 60);
		
	})();

	(function UpdateCalendarView(){

		var x = '';

		for (i = 0; i < 7; i++) {

			x += '<CalendarViewPlanetaryDay>' + Body.CalendarView.Days[i] + '</CalendarViewPlanetaryDay>';

		};

		var y = '';

		for (i = 0; i < new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay(); i++) {

			y += '<CalendarViewNumericalDay></CalendarViewNumericalDay>';

		};

		var z = '';

		for (i = 1; i < new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate() + 1; i++) {

			if (i == new Date().getDate()) {

				z += '<CalendarViewNumericalDay class="current">' + i + '</CalendarViewNumericalDay>';

			} else {

				z += '<CalendarViewNumericalDay>' + i + '</CalendarViewNumericalDay>';

			};

		};

		setTimeout(function(){
		
			$('CalendarView').html(x + y + z);

		}, 0);

		setTimeout(UpdateCalendarView, 1000 * 60);

	})();

	(function UpdateWeatherView(){
	
		// $('WeatherView').html(Body.WeatherView.Icon.Wait); (WAIT ICON NEEDS UPDATE...)

		var x = '<WeatherViewIcon>' + Body.WeatherView.Icon.Main() + '</WeatherViewIcon>';
		
		var y = '<WeatherViewDegrees>' + Body.WeatherView.Degrees() + '&deg;' + '</WeatherViewDegrees>';
		
		setTimeout(function(){
		
			$('WeatherView').html(x + y);
		
		}, 1000);
		
		setTimeout(UpdateWeatherView, 1000 * 60 * W_Reload);
		
	})();

});