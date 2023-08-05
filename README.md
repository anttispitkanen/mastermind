# Mastermind

The game of [Mastermind](<https://en.wikipedia.org/wiki/Mastermind_(board_game)>) implemented in different modes and languages.

See the standalone browser version live at https://anttispitkanen.github.io/mastermind/

![The browser version of the game illustrated](/Mastermind.png "The browser version of the game illustrated")

## Development

[asdf](https://asdf-vm.com/) is used for tool version management, so you need that installed as instructed on their site.

Each subdirectory here should have its own `.tool-versions` describing its requirements. For example the [/typescript](/typescript/) directory:

```bash
# change into the directory
cd typescript

# If you don't have the asdf nodejs plugin yet, install it first
asdf plugin add nodejs

# install the deps defined in .tool-versions
asdf install
```

...and with that your runtime should be ready for action.
