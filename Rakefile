# Tasks for working with site directory
namespace :site do
  desc 'Deploy to gh-pages'
  task :deploy do
    Rake::Task["site:build"].execute

    Dir.chdir(site_dir) do
      `git add -A :/`
      `git commit -m "Deploying at time #{Time.now.to_s}"`
      `git push`
    end
  end

  desc 'Build site directory to prepare for deploy'
  task :build do
    site_contents.each do |file_or_folder|
      `rsync --recursive --delete #{file_or_folder} #{site_dir}/`
    end
  end

  desc 'Copy deployed production app to site directory'
  task :copy_from_prod do
    `rm -rf #{site_dir}/`
    `git clone https://github.com/nwshane/atoms.git -b gh-pages #{site_dir}`
  end
end

def site_contents
  %w( index.html assets app bower_components CNAME )
end

def site_dir
  '_site'
end
