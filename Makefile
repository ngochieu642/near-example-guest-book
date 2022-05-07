.PHONY: deploy-contract
deploy-contract:
	npm run build:contract && \
	./node_modules/.bin/near deploy --accountId ngochieu642.testnet --wasmFile=./out/main.wasm

.PHONY: show-keys
show-keys:
	./node_modules/.bin/near keys ngochieu642.testnet

.PHONY: run-frontend
run-frontend:
	./node_modules/.bin/parcel src/index.html
