desc 'Deploy to gh-pages'
task :deploy do
  # Rsync
  `rsync index.html _site/`
  `rsync --recursive --delete assets _site/`
  `rsync --recursive --delete app _site/`
  `rsync --recursive --delete bower_components _site/`

  # Commit and push in _site directory


end
