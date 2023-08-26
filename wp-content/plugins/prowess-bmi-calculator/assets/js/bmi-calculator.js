(function($) {
    'use strict';
    $(document).ready(function() {
        bmiCalculator.init();
        bmiCalcSelect2();
    });
    var bmiCalculator = function() {
        var form = $('.qodef-bmic-form'),
            bmiCalcHolder = $('.qodef-bmi-calculator-holder'),
            data = {},
            notificationHolder = bmiCalcHolder.find('.qodef-bmic-notifications'),
            notificationTextHolder = notificationHolder.find('.qodef-bmic-notification-text'),
            iconHolder = notificationHolder.find('.qodef-bmic-icon-holder');
        var handleForm = function() {
            if (form.length && typeof form !== 'undefined') {
                form.submit(function(e) {
                    e.preventDefault();
                    data.formData = form.serialize();
                    data.action = 'prowess_bmi_calculate';
                    notificationHolder.hide();
                    notificationTextHolder.html('');
                    notificationHolder.removeClass('qodef-bmic-notification-error');
                    iconHolder.find('span').removeClass();
                    $.ajax({
                        data: data,
                        dataType: 'json',
                        type: 'POST',
                        url: qodefBmiCalculatorAjaxUrl,
                        success: function(response) {
                            if (response.hasError) {
                                notificationHolder.addClass('qodef-bmic-notification-error');
                            } else {
                                iconHolder.find('span').addClass('qodef-bmic-' + response.BMIRank);
                                clearForm();
                            }
                            notificationHolder.show();
                            notificationTextHolder.html(response.notificationText);
                        }
                    });
                });
            }
        };
        var clearForm = function() {
            form.find('input[type="text"], select, textarea').val('');
        };
        var handleCloseIcon = function() {
            var closeIcon = notificationHolder.find('.qodef-bmic-notification-close');
            if (closeIcon.length) {
                closeIcon.on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    notificationHolder.fadeOut();
                });
            }
        }
        return {
            init: function() {
                handleForm();
                handleCloseIcon();
            }
        }
    }();

    function bmiCalcSelect2() {
        var BMICalcHolder = $('.qodef-bmi-calculator-holder'),
            select;
        if (BMICalcHolder.length) {
            select = BMICalcHolder.find('select');
            if (select.length) {
                select.select2({
                    minimumResultsForSearch: Infinity
                });
            }
        }
    }
})(jQuery);