sap.ui.define([
	"opensap/manageproducts/ManageProducts/controller/BaseController",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function (BaseController, History, JSONModel, MessageToast) {
	"use strict";

	return BaseController.extend("opensap.manageproducts.ManageProducts.controller.Add", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf opensap.manageproducts.ManageProducts.view.Add
		 */
		onInit: function () {
			this.getRouter().getRoute("add").attachPatternMatched(this._onRouteMatched, this);
		
			// create default properties
			this._oProperties = {
			ProductID: "" + parseInt(Math.random() * 1000000000, 10),
			TypeCode: "PR",
			TaxTarifCode: 1,
			CurrencyCode: "EUR",
			MeasureUnit: "EA"
			};
			var oViewModel = new JSONModel(this._oProperties);
			this.setModel(oViewModel, "addView");
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf opensap.manageproducts.ManageProducts.view.Add
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf opensap.manageproducts.ManageProducts.view.Add
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf opensap.manageproducts.ManageProducts.view.Add
		 */
		//	onExit: function() {
		//
		//	}
		
		 /*=========================================================== */
		/* event handlers */
		/* =========================================================== */
		
		/**
		* Event handler for navigating back.
		* It checks if there is a history entry. If yes, history.go(-1) will
		happen.
		* If not, it will replace the current entry of the browser history
		with the worklist route.
		* @public
		*/
		onNavBack : function(){
			// discard new product from model.
			this.getModel().deleteCreatedEntry(this._oContext);
			
			var oHistory = History.getInstance(),
			sPreviousHash = oHistory.getPreviousHash();
			
			if(sPreviousHash){
				// The history contains a previous entry
				history.go(-1);
			}else{
				// Otherwise we go backwards with a forward history
				this.getRouter().navTo("worklist", {}, true);
			}
		},
		/**
		* Event handler for the cancel action
		* @public
		*/
		onCancel: function() {
			this.onNavBack();
		},
		/**
		* Event handler for the save action
		* @public
		*/
		onSave: function() {
			this.getModel().submitChanges();
		},
		 /*=========================================================== */
		/* internal methods */
		/* =========================================================== */
				
		_onRouteMatched: function() {
			//here goes your logic which will be executed when the "add" route is hit
			//will be done within the next unit
			// register for metadata loaded events
			var oModel = this.getModel();
			oModel.metadataLoaded().then(this._onMetadataLoaded.bind(this));
		},
		
		_onMetadataLoaded : function(){
			
			// create new entry in the model
			this._oContext = this.getModel().createEntry("/ProductSet", {
				properties : this._oProperties,
				success : this._onCreateSuccess.bind(this)
			});
			
			// bind the view to the new entry
			this.getView().setBindingContext(this._oContext);
		},
		
		_onCreateSuccess : function(oProduct){
			// navigate to the new product's object view
			var sId = oProduct.ProductID;
			this.getRouter().navTo("object", {
				objectId : sId
			}, true);
			
			// unbind the view to not show this object again
			this.getView().unbindObject();
			
			// show success messge
			var sMessage = this.getResourceBundle().getText("newObjectCreated", [oProduct.Name]);
			MessageToast.show(sMessage, { 
				closeOnBrowserNavigation : false 	
			});
		}
		
	});

});