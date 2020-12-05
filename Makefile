.PHONY: prepare clean

# pip3 install jsmin htmlmin csscompressor

all: prepare

prepare:
	./tools/prepare_static_ui_sources.py -a

clean:
	rm -f ./src/data*.h
	rm -f ./data/css/*.min.css
	rm -f ./data/js/*.min.js
