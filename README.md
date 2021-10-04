# Code Rhapsodie Ez Autosave Bundle

This bundle adds a simple autosave feature for eZPlatform.

Version 1 is for eZPlatform 2. Version 2 is for eZPlatform 3 (Ibexa Content).

Client-side only, browser storage is used to save content state. No JS librairies required.

# Features

While creating or editing a content, its fields values will be regularly saved.

To load saved values, simply create a new content of the same content type, or edit the same content, and you will be asked if you want to restore saved values.

## Installation

### Add the dependency

To install this bundle, run this command :

```shell script
$ composer require code-rhapsodie/ezautosave-bundle
```

### Register the bundle

#### Symfony 4+ (new tree)

For Symfony 4+, add `CodeRhapsodie\EzAutosaveBundle\CodeRhapsodieEzAutosaveBundle::class => ['all' => true],
` in the `config/bundles.php` file.

Like this:

```php
<?php

return [
     // ...
    CodeRhapsodie\EzAutosaveBundle\CodeRhapsodieEzAutosaveBundle::class => ['all' => true],
    // ...
];
```

#### Symfony 3.4 (old tree)

For Symfony 3.4, add a new line in the `app/AppKernel.php` file.

Like this:

```php
<?php
// app/AppKernel.php

public function registerBundles()
{
    $bundles = [
        // ...
        new CodeRhapsodie\EzAutosaveBundle\CodeRhapsodieEzAutosaveBundle(),
        // ...
    ];
}
```

# Issues and feature requests

Please report issues and request features at https://github.com/code-rhapsodie/ezautosave-bundle/issues.

# Contributing

Contributions are very welcome. Please see [CONTRIBUTING.md](CONTRIBUTING.md) for
details. Thanks to [everyone who has contributed](https://github.com/code-rhapsodie/ezautosave-bundle/graphs/contributors)
already.

# License

This package is licensed under the [MIT license](LICENSE).
