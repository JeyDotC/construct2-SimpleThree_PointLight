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
function GetBehaviorSettings()
{
	return {
		"name":			"SimpleThree PointLight",			// as appears in 'add behavior' dialog, can be changed as long as "id" stays the same
		"id":			"SimpleThree_PointLight",			// this is used to SimpleThree_PointLight this behavior and is saved to the project; never change it
		"version":		"1.0",					// (float in x.y format) Behavior version - C2 shows compatibility warnings based on this
		"description":	"Makes an object act as a point of light.",
		"author":		"JeyDotC",
		"help url":		"https://github.com/JeyDotC/construct2-SimpleThree_PointLight",
		"category":		"Three Js",				// Prefer to re-use existing categories, but you can set anything here
		"flags":		0						// uncomment lines to enable flags...
					//	| bf_onlyone			// can only be added once to an object, e.g. solid
	};
};

if (typeof module !== 'undefined') {
	module.exports = { settings: GetBehaviorSettings(), type: 'Behavior'};
}
// Actions

AddStringParam('Color', 'Point light color in CSS-style string', '"#ffffff"');
AddAction(0, 0, "Set The Point light Color", "Point Light", "The Point light Color is <b>{0}</b> now", "Set the Point light Color.", "SetPointLightColor");

AddNumberParam("Intensity", "The new point light's intensity.", 1);
AddAction(1, 0, "Set Point Light Intensity", "Point Light", "Point Light Intensity to <b>{0}</b>", "Set the Point Light's Intensity.", "SetPointLightIntensity");

AddNumberParam("Distance", "The point light's maximum distance in 2D pixels (0 = no limit).", 0);
AddAction(2, 0, "Set PointLight maximum distance in 2D pixels", "Point Light", "Point Light maximum distance to <b>{0}</b> pixels", "Set the Point Light's maximum distance in pixels.", "SetPointLightDistance");

AddNumberParam("Elevation", "The new point light's elevation in 2D Pixels.", 0);
AddAction(3, 0, "Set Point Light's Elevation from 2D pixels", "Transform", "Point Light Elevation to <b>{0}</b>", "Set the Point Light's Elevation from 2D pixel length.", "SetElevationFrom2D");

AddNumberParam('Color', 'Point light color using rgb() expression', cr.RGB(255, 255, 255));
AddAction(0, 0, "Set The Point light Color from number", "Point Light", "The Point light Color is <b>{0}</b> now", "Set the Point light Color.", "SetPointLightColorFromNumber");

// Conditions

// Expressions
AddExpression(0, ef_return_number, "Color", "Point Light", "Color", "The PointLight Color.");
AddExpression(1, ef_return_number, "Intensity", "Point Light", "Intensity", "The PointLight Intensity.");
AddExpression(2, ef_return_number, "Distance", "Point Light", "Distance", "The PointLight Distance.");
AddExpression(3, ef_return_number, "Elevation", "Transform", "Elevation", "The PointLight Elevation.");

////////////////////////////////////////
ACESDone();

var property_list = [
	/* 0*/new cr.Property(ept_color, "Color", cr.RGB(255, 255, 255), "The pointlight's color in RGB format."),
	/* 1*/new cr.Property(ept_float, "Intensity", 1, "The point light's intensity."),
	/* 2*/new cr.Property(ept_float, "Distance", 0, "Maximum point light's distance in pixels (0 = no limit)."),
	/*--*/ new cr.Property(ept_section, "Transform"),
	/* 3*/new cr.Property(ept_float, "Elevation", 0, "Point light's elevation in pixels."),
];
	
// Called by IDE when a new behavior type is to be created
function CreateIDEBehaviorType()
{
	return new IDEBehaviorType();
}

// Class representing a behavior type in the IDE
function IDEBehaviorType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new behavior instance of this type is to be created
IDEBehaviorType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance, this);
};

// Class representing an individual instance of the behavior in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	// Save the constructor parameters
	this.instance = instance;
	this.type = type;
	
	// Set the default property values from the property table
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
		
	// any other properties here, e.g...
	// this.myValue = 0;
}

// Called by the IDE after all initialization on this instance has been completed
IDEInstance.prototype.OnCreate = function()
{
};

// Called by the IDE after a property has been changed
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
};
