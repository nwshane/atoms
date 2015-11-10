desc 'Deploy to gh-pages'
task :deploy do
  # Rsync
  `rsync index.html _site/`
  `rsync --recursive --delete assets _site/`
  `rsync --recursive --delete app _site/`
  `rsync --recursive --delete bower_components _site/`

  # Commit and push in _site directory
  Dir.chdir('_site') do
    `git add -A :/`
    `git commit -m "Deploying at time #{Time.now.to_s}"`
    `git push`
  end
end
