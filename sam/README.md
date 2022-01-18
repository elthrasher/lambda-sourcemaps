# SAM Stack

| command                                            | when               |
| -------------------------------------------------- | ------------------ |
| `npm i`                                            | Do this first      |
| `npm run build:lambda`                             | Build functions    |
| `sam deploy --guided --template sam/template.yaml` | First deploy       |
| `npm run deploy:sam`                               | Subsequent deploys |
| `npm run sam:destroy`                              | Tear it down       |
