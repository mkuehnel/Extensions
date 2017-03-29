#
# Global news configuration
# Includes the News Plugins into typoscript Objects
#

lib.kbreportPlugin = USER
lib.kbreportPlugin {
    userFunc = TYPO3\CMS\Extbase\Core\Bootstrap->run
    extensionName = News
    pluginName = Pi1
    vendorName = GeorgRinger

    switchableControllerActions.News.1 = list
    settings < plugin.tx_news.settings
    settings {
        overrideFlexformSettingsIfEmpty := addToList(detailPid)
        startingpoint = {$page.uid.kalenbornreportData}
        defaultDetailPid = {$page.uid.kalenbornreport}
    }
}

lib.kbreportPlugin {
    mvc.callDefaultActionIfActionCantBeResolved = 1

    #
    # Overwrite this values in your local instance extension if you
    # want to use your own templates
    #
    view {
        templateRootPaths {
            0 = EXT:news/Resources/Private/Templates/
            1 = {$plugin.kalenbornreport.view.templateRootPath}
        }

        partialRootPaths {
            0 = EXT:news/Resources/Private/Partials/
            1 = {$plugin.kalenbornreport.view.partialRootPath}
        }

        layoutRootPaths {
            0 = EXT:news/Resources/Private/Layouts/
            1 = {$plugin.kalenbornreport.view.layoutRootPath}
        }

        widget.GeorgRinger\News\ViewHelpers\Widget\PaginateViewHelper.templateRootPath = EXT:news/Resources/Private/Templates/
    }
}

lib.kbreportSettings.isLatest = TEXT
lib.kbreportSettings.isLatest.value = 0

[globalVar = TSFE:id = {$page.uid.root}]
    lib.kbreportSettings.isLatest.value = 1
[global]

# Latest
lib.kbreportLatestPlugin < lib.kbreportPlugin
lib.kbreportLatestPlugin {
    action = list
    switchableControllerActions.News.1 = list
    settings {
        limit = 3
    }

    stdWrap.dataWrap = <h3>{LLL:EXT:rm_base_instance/Resources/Private/Language/locallang.xlf:news.latest_topic}</h3>|
    stdWrap.insertData = 1
}

# Latest Slider

lib.kbreportLatestSliderPlugin < lib.kbreportPlugin
lib.kbreportLatestSliderPlugin {
    action = list
    switchableControllerActions.News.1 = list
    settings {
        limit = 3
        isSlider = 1
        list.media.image.width = 600c
        list.media.image.height = 370

        excludeAlreadyDisplayedNews = 1
    }
}

# List and Detail (on the same page)
# List
lib.kbreportListAndDetailPlugin < lib.kbreportPlugin
lib.kbreportListAndDetailPlugin {
    action = list

    settings {
        list.media.image.maxHeight = 600
        list.media.image.maxWidth = 300
        categoryConjunction = OR
    }
}

# Detail (hide latest Slider)
[globalVar = TSFE:id = {$page.uid.kalenbornreport}] && [globalVar = GP:tx_news_pi1|news > 0]
    lib.kbreportListAndDetailPlugin {
        action = detail
        switchableControllerActions.News.1 = detail
        settings.detail.checkPidOfNewsRecord = 0
    }

    lib.kbreportLatestSliderPlugin >
[global]

lib.pageUid.kalenbornreport = TEXT
lib.pageUid.news.value = {$page.uid.kalenbornreport}

# Category View
[globalVar = GP:tx_news_pi1|overwriteDemand|categories > 0]
    lib.kbreportLatestSliderPlugin >
[global]