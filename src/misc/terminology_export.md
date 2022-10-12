# Exporting terminology

When new terminology is added to Pontoon, we may want to ensure that those latest terms are added to our vendor platform Smartling. The [TBX Merge tool](https://github.com/mozilla-l10n/pontoon-scripts/tree/main/tbx_merge) can be used to export all terminology for a defined set of locales and merged into a single .tbx file for import into Smartling.

## TBX Merge tool documentation

The tbx_merge tool exports, merges, and prepares terminology for import into Smartling via a tbx (v2) file.

## Requirements

To run the script you will need the following:
* Python (tested working on version 3.10)
* requests module
* List of locales you wish to extract from Pontoon (see "locales.txt" for example)

***If importing terms into an existing glossary on Smartling***
* A tbx format glossary export from Smartling

## Syntax

Call tbx_merge.py from your command line, with the following arguments:

--locales *filepath*  
(***Required***) Designate the filepath of a .txt file that contains the list of Pontoon locale codes (separated by newline) you would like to extract from Pontoon and merge.

--id-format (*smartling, new, pontoon*)  
Select from one of three strategies for dealing with termEntry IDs.

*smartling*: This will apply the UID Smartling uses to manage glossary terms to any Pontoon terms that match. Any terms not in Smartling will have their Pontoon ID removed for import into Smartling as a new term. This requires a tbx file exported from Smartling to match and assign IDs. The file will need to be identified by the separate argument --smartling.
**Note:** This script uses the term and definition to match between Pontoon and Smartling. Any manual changes made to either a term or definition in either Pontoon or Smartling will cause the script to flag it as a new term.  
Outputs: smartling_merge_glossary.tbx

*new*: This will remove all Pontoon IDs for all termEntry elements, causing all terminology to be treated as a new term upon import into Smartling. Typically this would be used if creating a new glossary from scratch.  
Outputs: smartling_new_glossary.tbx

*pontoon*: This will preserve all Pontoon IDs. Smartling will not be able to import the resulting file as Smartling requires the UIDs to be assigned by its platform.  
Outputs: pontoon_glossary_multilingual.tbx

--smartling *filepath*  
(***Required if --id-format smartling argument selected***) Designate the filepath of a .tbx file exported from Smartling.

## Importing terminology into Smartling

Terminology is managed in within Linguistic Assets section of Account Settings. After logging in select `Account Settings` > `Linguistic Assets`, from there on the left hand menu select `Glossaries`.

From there select a glossary you would like to update, or create a new one, then import terminology by selecting `...` > `Import Glossary`.

### Importing into a new glossary

Use the following steps to import into a new glossary (or a glossary that does not contain any registered terms).

1. Create a locales.txt file with your desired locales separated on newlines, saved to *path*.
2. Run tbx_merge from the commandline (ensure you have the requests module installed):

```
$ python tbx_merge.py --locales path/locales.txt --id-format new
```

3. Within Smartling, select the glossary you wish to import terms into and choose `...` > `Import Glossary`.
4. Choose the file exported by tbx_merge. In this case it will be named: `smartling_new_glossary.tbx`
5. Smartling will display which languages and the number of terms that will be updated. Click `Import` to finish the import.  
**Note**: Even the Smartling shows all languages in the import file on import, only terms from languages specified in Current Glossary Languages will actually be imported. You can add more languages to the glossary in Smartling by choosing `...` > `Add Language`.

### Updating an existing glossary

The steps are mostly the same, as before, but you will need to first export the target glossary from Smartling as a tbx file.

1. Within Smartling, select the glossary you wish to import terms into and choose `...` > `Export Glossary`. For Download File Type choose `TBX V2 Core` and from the Languages dropdown select `Select displayed results (n)` to choose all target languages in the glossary. Save *glossary* file to *path*. Note: You must always include the source "en-US" locale when exporting from Smartling.
2. Create a locales.txt file with your desired locales separated on newlines, saved to *path*.
3. Run tbx_merge from the commandline (ensure you have the requests module installed):

```
$ python tbx_merge.py --locales path/locales.txt --id-format smartling --smartling path/glossary.tbx
```

4. Within Smartling, select the glossary you wish to import terms into and choose `...` > `Import Glossary`.
5. Choose the file exported by tbx_merge. In this case it will be named: `smartling_merge_glossary.tbx`
6. Smartling will display which languages and the number of terms that will be updated. Click `Import` to finish the import.  
**Note**: Even the Smartling shows all languages in the import file on import, only terms from languages specified in Current Glossary Languages will actually be imported. You can add more languages to the glossary in Smartling by choosing `...` > `Add Language`.
