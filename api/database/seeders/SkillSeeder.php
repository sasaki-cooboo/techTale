<?php

namespace Database\Seeders;

use App\Models\Skill;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $webFrameworks = [
            "Vue.js",
            "React",
            "Angular",
            "Laravel",
            "Ruby on Rails",
            "Django",
            "Express.js",
            "Spring Boot",
            "Symfony",
            "Ember.js",
            "ASP.NET Core",
            "Flask",
            "Meteor",
            "CodeIgniter",
            "Zend Framework",
            "Struts",
            "Grails",
            "Play Framework",
            "Slim",
        ];
        $databases = [
            "MySQL",
            "PostgreSQL",
            "SQLite",
            "Microsoft SQL Server",
            "Oracle Database",
            "MongoDB",
            "Redis",
            "Cassandra",
            "MariaDB",
            "Amazon RDS",
            "Elasticsearch",
            "Couchbase",
            "Amazon DynamoDB",
            "Firebase Realtime Database",
            "Neo4j",
            "CouchDB",
            "Riak",
            "HBase",
            "Memcached",
        ];
        $cloudProviders = [
            "Amazon Web Services (AWS)",
            "Microsoft Azure",
            "Google Cloud Platform (GCP)",
            "IBM Cloud",
            "Oracle Cloud",
            "Alibaba Cloud",
            "DigitalOcean",
            "Salesforce",
            "Heroku",
            "Rackspace",
            "VMware Cloud",
            "Red Hat OpenShift",
            "Kubernetes",
            "Cloud Foundry",
            "Adobe Experience Cloud",
            "SAP Cloud Platform",
            "ServiceNow",
        ];

        foreach ($webFrameworks as $webFramework) {
            Skill::create([
                "name" => $webFramework,
                "skill_type_id" => 1
            ]);
        }
        foreach ($databases as $database) {
            Skill::create([
                "name" => $database,
                "skill_type_id" => 2
            ]);
        }
        foreach ($cloudProviders as $cloudProvider) {
            Skill::create([
                "name" => $cloudProvider,
                "skill_type_id" => 3
            ]);
        }
    }
}
