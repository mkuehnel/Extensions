#
# Global news configuration
# Includes the News Plugins into typoscript Objects
#

lib.kbreportCatlist = USER
lib.kbreportCatlist {
   userFunc = TYPO3\CMS\Extbase\Core\Bootstrap->run
   extensionName = News
   pluginName = Pi1
   vendorName = GeorgRinger

   action = list
   settings < plugin.tx_news.settings
   settings {
      overrideFlexformSettingsIfEmpty := addToList(detailPid)
      startingpoint = {$page.uid.kalenbornreportData}
      defaultDetailPid = {$page.uid.kalenbornreport}

      categoryConjunction = OR
      includeSubCategories = 1

   }
   switchableControllerActions.Category.1 = list
   stdWrap.dataWrap = <div class="kbreport-header"><h3 class="kbreport-title">Kategorien</h3></div>|

}

