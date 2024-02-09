/*
Copyright 2024 Jeysson Guevara (JeyDotC)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.behaviors, "cr.behaviors not created");

/////////////////////////////////////
// Behavior class
cr.behaviors.SimpleThree_PointLight = function (runtime) {
    this.runtime = runtime;
};

(function () {
    const behaviorProto = cr.behaviors.SimpleThree_PointLight.prototype;

    /////////////////////////////////////
    // Behavior type class
    behaviorProto.Type = function (behavior, objtype) {
        this.behavior = behavior;
        this.objtype = objtype;
        this.runtime = behavior.runtime;

        this.simpleThree = undefined;
    };

    const behtypeProto = behaviorProto.Type.prototype;

    behtypeProto.onCreate = function () {

    };

    /////////////////////////////////////
    // Behavior instance class
    behaviorProto.Instance = function (type, inst) {
        this.type = type;
        this.behavior = type.behavior;
        this.inst = inst;				// associated object instance to modify
        this.runtime = type.runtime;

        this.color = cr.RGB(255, 255, 255);
        this.intensity = 1;
        this.distance = 0;
        this.elevation = 0;
    };

    const behinstProto = behaviorProto.Instance.prototype;

    behinstProto.findSimpleThreeInstance = function () {
        const simpleThreeInstances = Object.values(this.runtime.objectsByUid)
            .filter(instance => instance.plugin instanceof cr.plugins_.SimpleThree);

        if (simpleThreeInstances.length === 0) {
            return undefined;
        }

        return simpleThreeInstances[0];
    };

    function colorFromRef(colorRef) {
        return new THREE.Color(
            cr.GetRValue(colorRef) / 255,
            cr.GetGValue(colorRef) / 255,
            cr.GetBValue(colorRef) / 255
        );
    }

    behinstProto.onCreate = function () {
        const colorRef = this.properties[0];
        this.color = colorFromRef(colorRef);

        this.intensity = this.properties[1];
        this.distance = this.properties[2];
        this.elevation = this.properties[3];

        this.simpleThree = this.findSimpleThreeInstance();
        this.pixelsTo3DUnits = v => v;

        if (this.simpleThree === undefined) {
            console.warn('No simpleThree Object found. If it exists in this layout and you see this message, try moving the SimpleThree object to the bottom of the layer.');
            return;
        }

        this.pixelsTo3DUnits = this.simpleThree.pixelsTo3DUnits.bind(this.simpleThree);

        const distance3D = this.distance === 0 ? 0 : this.pixelsTo3DUnits(this.distance);
        this.pointLight = new THREE.PointLight(this.color, this.intensity, distance3D);

        this.pointLight.position.set(
            this.pixelsTo3DUnits(this.inst.x),
            this.pixelsTo3DUnits(this.elevation),
            this.pixelsTo3DUnits(this.inst.y)
        );

        this.simpleThree.scene.add(this.pointLight);
    };

    behinstProto.updatePivot = function () {
        this.pointLight.position.set(
            this.pixelsTo3DUnits(this.inst.x),
            this.pixelsTo3DUnits(this.elevation),
            this.pixelsTo3DUnits(this.inst.y)
        );
    };


    behinstProto.onDestroy = function () {
        // called when associated object is being destroyed
        // note runtime may keep the object and behavior alive after this call for recycling;
        // release, recycle or reset any references here as necessary
        this.simpleThree?.scene?.remove(this.pointLight);
        this.pointLight = undefined;
    };

    // called when saving the full state of the game
    behinstProto.saveToJSON = function () {
        // return a Javascript object containing information about your behavior's state
        // note you MUST use double-quote syntax (e.g. "property": value) to prevent
        // Closure Compiler renaming and breaking the save format
        return {
            "c": this.color.getHex(),
            "i": this.intensity,
            "d": this.distance,
            "e": this.elevation,
        };
    };

    // called when loading the full state of the game
    behinstProto.loadFromJSON = function (o) {
        const acts = this.plugin.acts;

        acts.SetPointLightColor.bind(this)(o["c"]);
        acts.SetElevationFrom2D.bind(this)(o["e"]);
        acts.SetPointLightDistance.bind(this)(o["d"]);
        acts.SetPointLightIntensity.bind(this)(o["i"]);
    };

    behinstProto.tick = function () {
        this.updatePivot();
    };

    // The comments around these functions ensure they are removed when exporting, since the
    // debugger code is no longer relevant after publishing.
    /**BEGIN-PREVIEWONLY**/
    behinstProto.getDebuggerValues = function (propsections) {
        // Append to propsections any debugger sections you want to appear.
        // Each section is an object with two members: "title" and "properties".
        // "properties" is an array of individual debugger properties to display
        // with their name and value, and some other optional settings.
        propsections.push({
            "title": this.type.name,
            "properties": [
                { "name": "Color", "value": `#${this.color.getHexString()}` },
                { "name": "Intensity", "value": this.intensity },
                { "name": "Distance", "value": this.distance },
                { "name": "Elevation", "value": this.elevation },
            ]
        });
    };

    behinstProto.onDebugValueEdited = function (header, name, value) {
        const acts = this.behavior.acts;
        switch (name) {
            case "Color":
                acts.SetPointLightColor.bind(this)(value);
                break;
            case "Elevation":
                acts.SetElevationFrom2D.bind(this)(value);
                break;
            case "Distance":
                acts.SetPointLightDistance.bind(this)(value);
                break;
            case "Intensity":
                acts.SetPointLightIntensity.bind(this)(value);
                break;
        }
    };

    /**END-PREVIEWONLY**/

    //////////////////////////////////////
    // Conditions
    function Cnds() {
    }

    // Conditions here ...
    /*Cnds.prototype.CompareVerticalHeight = function (cmp, value) {
        return cr.do_cmp(this.verticalHeight, cmp, value);
    };

    Cnds.prototype.CompareElevation = function (cmp, value) {
        return cr.do_cmp(this.elevation, cmp, value);
    };

    Cnds.prototype.CompareRotationX = function (cmp, value) {
        return cr.do_cmp(this.rotationX, cmp, cr.to_radians(value));
    };

    Cnds.prototype.CompareRotationZ = function (cmp, value) {
        return cr.do_cmp(this.rotationZ, cmp, cr.to_radians(value));
    };*/

    behaviorProto.cnds = new Cnds();

    //////////////////////////////////////
    // Actions
    function Acts() {
    }
    /*
SetPointLightDistance
    */

    Acts.prototype.SetPointLightColor = function (color) {
        this.pointLight.color = this.color = new THREE.Color(color)
    };

    Acts.prototype.SetPointLightColorFromNumber = function (color) {
        this.pointLight.color = this.color = colorFromRef(color);
    };

    Acts.prototype.SetElevationFrom2D = function (elevation) {
        this.elevation = elevation;
    };

    Acts.prototype.SetPointLightIntensity = function (intensity) {
        this.intensity = intensity;
        this.pointLight.intensity = this.intensity;
    };

    Acts.prototype.SetPointLightDistance = function (distance) {
        this.distance = distance;
        this.pointLight.distance = this.distance === 0 ? 0 : this.pixelsTo3DUnits(this.distance);
    };

    // Actions here ...

    behaviorProto.acts = new Acts();

    //////////////////////////////////////
    // Expressions
    function Exps() {
    }

    Exps.prototype.Color = function (ret) {
        ret.set_string(this.color);
    };

    Exps.prototype.Elevation = function (ret) {
        ret.set_float(this.elevation);
    };

    Exps.prototype.Intensity = function (ret) {
        ret.set_float(this.intensity);
    };

    Exps.prototype.Distance = function (ret) {
        ret.set_float(this.distance);
    };

    // Expressions here ...

    behaviorProto.exps = new Exps();

}());
