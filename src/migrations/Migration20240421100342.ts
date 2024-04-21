import { Migration } from '@mikro-orm/migrations';

export class Migration20240421100342 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `collection` (`id` int unsigned not null auto_increment primary key, `created_at` datetime not null, `updated_at` datetime not null, `name` varchar(255) not null, `state` enum(\'hidden\', \'published\') not null default \'hidden\', `priority` int not null default 0) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `collection_match_products` (`collection_id` int unsigned not null, `product_id` int unsigned not null, primary key (`collection_id`, `product_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `collection_match_products` add index `collection_match_products_collection_id_index`(`collection_id`);');
    this.addSql('alter table `collection_match_products` add index `collection_match_products_product_id_index`(`product_id`);');

    this.addSql('create table `collection_fetch_products` (`collection_id` int unsigned not null, `product_id` int unsigned not null, primary key (`collection_id`, `product_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `collection_fetch_products` add index `collection_fetch_products_collection_id_index`(`collection_id`);');
    this.addSql('alter table `collection_fetch_products` add index `collection_fetch_products_product_id_index`(`product_id`);');

    this.addSql('alter table `collection_match_products` add constraint `collection_match_products_collection_id_foreign` foreign key (`collection_id`) references `collection` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `collection_match_products` add constraint `collection_match_products_product_id_foreign` foreign key (`product_id`) references `product` (`id`) on update cascade on delete cascade;');

    this.addSql('alter table `collection_fetch_products` add constraint `collection_fetch_products_collection_id_foreign` foreign key (`collection_id`) references `collection` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `collection_fetch_products` add constraint `collection_fetch_products_product_id_foreign` foreign key (`product_id`) references `product` (`id`) on update cascade on delete cascade;');

    this.addSql('drop table if exists `product_related`;');

    this.addSql('alter table `product` drop column `price`;');
  }

  async down(): Promise<void> {
    this.addSql('alter table `collection_match_products` drop foreign key `collection_match_products_collection_id_foreign`;');

    this.addSql('alter table `collection_fetch_products` drop foreign key `collection_fetch_products_collection_id_foreign`;');

    this.addSql('create table `product_related` (`product_1_id` int unsigned not null, `product_2_id` int unsigned not null, primary key (`product_1_id`, `product_2_id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `product_related` add index `product_related_product_1_id_index`(`product_1_id`);');
    this.addSql('alter table `product_related` add index `product_related_product_2_id_index`(`product_2_id`);');

    this.addSql('alter table `product_related` add constraint `product_related_product_1_id_foreign` foreign key (`product_1_id`) references `product` (`id`) on update cascade on delete cascade;');
    this.addSql('alter table `product_related` add constraint `product_related_product_2_id_foreign` foreign key (`product_2_id`) references `product` (`id`) on update cascade on delete cascade;');

    this.addSql('drop table if exists `collection`;');

    this.addSql('drop table if exists `collection_match_products`;');

    this.addSql('drop table if exists `collection_fetch_products`;');

    this.addSql('alter table `product` add `price` int not null;');
  }

}
