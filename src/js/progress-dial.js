(function ($) {
	$.fn.progressDial = function(parameters = {}) {
    parameters.value = parameters.value === undefined ? 0 : parameters.value;
    parameters.total = parameters.total === undefined ? 0 : parameters.total;
    parameters.color = parameters.color === undefined ? '#7090B0' : parameters.color;
    parameters.topText = parameters.topText === undefined ? '' : parameters.topText;
    parameters.bottomText = parameters.bottomText === undefined ? '' : parameters.bottomText;
    parameters.unit = parameters.unit === undefined ? '' : parameters.unit;
    
		this.html(
      '<div class="progress-dial">'
        + '<svg viewBox="0 0 100 100">'
          + '<path d="M 50,50 m 0,-48 a 48,48 0 1 1 0,96 a 48,48 0 1 1 0,-96" stroke="#777" stroke-width="2" fill-opacity="0"></path>'
          + '<path d="M 50,50 m 0,-48 a 48,48 0 1 1 0,96 a 48,48 0 1 1 0,-96" class="progress-dial-stroke" stroke="' + parameters.color + '" stroke-width="2" fill-opacity="0" style="stroke-dashoffset:302; stroke-dasharray: 302;"></path>'
        + '</svg>'
        + '<div class="progress-dial-content">'
          + '<div class="progress-dial-top-text">' + parameters.topText + '</div>'
          + '<div class="progress-dial-value"><span class="value">' + parameters.value + '</span><span class="unit">' + parameters.unit + '</span></div>'
          + '<div class="progress-dial-bottom-text">' + parameters.bottomText + '</div>'
        + '</div>'
      + '</div>'
    );
		var pd = new ProgressDial(this, parameters.value, parameters.total);

		return pd;
	}

	class ProgressDial {
		constructor(element, value, total = 100) {
			this._value = 0;
      this._total = total;
			this._element = element;

      this.updateValue(value);
		}

    updateValue(value) {
      value = value > this._total ? this._total : value;

      this._value = value;
      this.animate();
    }

		animate() {
      this._element.find('.progress-dial-stroke').animate({
        strokeDashoffset: 302 - ((this._value / this._total) * 302),
      }, {
        duration: 1000,
        step: (value) => {
          this._element.find('.progress-dial-value .value').text(Math.round(((302 - value) / 302) * this._total));
        }
      });
		}
	}
}(jQuery));