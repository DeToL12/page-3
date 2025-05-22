window.startAdrum = function (appDynamicsConfig) {
    if (appDynamicsConfig.enableAppdynamics == true) {
        window['adrum-start-time'] = new Date().getTime();
        (function (config) {
            config.appKey = appDynamicsConfig.appdynamicsKey;
            config.adrumExtUrlHttp = 'http://cdn.appdynamics.com';
            config.adrumExtUrlHttps = 'https://cdn.appdynamics.com';
            config.beaconUrlHttp = 'http://col.eum-appdynamics.com';
            config.beaconUrlHttps = 'https://col.eum-appdynamics.com';
            config.geoResolverUrlHttp = 'https://appd-geo.geo.t-mobile.com/geo/';
            config.geoResolverUrlHttps = 'https://appd-geo.geo.t-mobile.com/geo/';
            config.xd = { enable: false };
            config.spa = { 'spa2': true };
            config.isZonePromise = true;
        })(window['adrum-config'] || (window['adrum-config'] = {}));
        if ('https:' === document.location.protocol) {
            let redirectUrl = 'https://cdn.appdynamics.com/adrum/adrum-latest.js'
            loadAdrum(redirectUrl);
        } else {
            let redirectUrl = 'https://cdn.appdynamics.com/adrum/adrum-latest.js'
            loadAdrum(redirectUrl);
        }
    }
    function loadAdrum(redirectUrl) {
        let node = document.createElement('script');
        node.src = redirectUrl;
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    }
}