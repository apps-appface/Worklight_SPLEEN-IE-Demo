1. Install Eclipse in your system

The supported versions of Eclipse are
– Eclipse Juno v4.2.2 (SR2)
– Eclipse Kepler v4.3.1 (SR1)
– Eclipse Classic v4.2.2
– Eclipse Classic v4.3.1

2.Install IBM Worklight(IBM MobileFirst) plugin in Eclipse

  Procedure
  ---------
  
 -Start your Eclipse JUNO IDE workbench.
 -Click Help > Eclipse Marketplace.
 -Search for IBM Worklight(IBM MobileFirst) Studio and click go (or) you can use link http://public.dhe.ibm.com/ibmdl/export/pub/software/products/en/MobileFirstPlatform/mfpsupdate/ to install plugin.
 -Select IBM Worklight(IBM MobileFirst) Studio and click on install.
 -Select the features of IBM Worklight(IBM MobileFirst) Studio that you want to install, and then click Next.
 -On the Install Details page, review the features that you are installing, and then click Next.
 -On the Review Licenses page, review the license text. If you agree to the terms, click I accept the terms of the license agreement and then click Finish. The installation process starts.
 -When the installation process completes, restart the workbench.
 -Create the path for Workspace and click ok.
 -Eclipse IDE will open.


 For Database
 ------------
 
 -install mysql in your system.
 -Create SPLEEN_IE Database and import spleen_ie.sql file to that database.
 
3.Import project in your workspace
 
4.Right click project_name/apps/app/SPLEEN and select run on IBM MobileFirst Development Server.
 
5.Deploy each adapter by right clicking on project_name/adapter/adapter_name and select Deploy adapter option.
 
6.Right click on project and select Open IBM MobileFirst Console to run on WorklightServer.
 
7.Select android to see application in worklight mobile simulator.